import {
  Entity,
  PrimaryKey,
  Property,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { IsNotEmpty, MinLength } from 'class-validator';

// Entities
import { Post } from './post.entity';

@Entity()
export class Tag {
  @PrimaryKey()
  @Property()
  @IsNotEmpty()
  @MinLength(2)
  name!: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts = new Collection<Post>(this);
}
