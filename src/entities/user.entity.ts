import {
  Entity,
  PrimaryKey,
  Property,
  Unique,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { v4 } from 'uuid';

// Entities
import { Post } from './post.entity';

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

  @OneToMany(() => Post, (post) => post.author)
  posts = new Collection<Post>(this);

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt!: Date;
}
