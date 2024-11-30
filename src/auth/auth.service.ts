import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly em: EntityManager) {}

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
}
