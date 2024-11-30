import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { v4 } from 'uuid';

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  @IsEmail()
  @Unique()
  email!: string;

  @Property()
  @IsNotEmpty()
  @MinLength(2)
  name!: string;

  @Property({ hidden: true })
  @MinLength(8)
  password: string;

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt!: Date;
}
