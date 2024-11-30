import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly em: EntityManager,
    private jwtService: JwtService,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.em.findOne(User, { email });
  }

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.em.create(User, {
      name,
      email,
      password: hashedPassword,
    });

    await this.em.flush();

    return user;
  }
  async validateUser(email: string, password: string) {
    const existingUser = await this.findByEmail(email);
    if (!existingUser) {
      return null;
    }
    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isValidPassword) {
      return null;
    }
    const { password: _, ...result } = existingUser;
    return result;
  }
  async signIn(user: User): Promise<{ access_token: string }> {
    const payload = { sub: user.id, name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
