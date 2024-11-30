import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { IsNotEmpty } from 'class-validator';
import { v4 } from 'uuid';

// Entities
import { Post } from './post.entity';

@Entity()
export class Comment {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  @IsNotEmpty()
  content!: string;

  @ManyToOne(() => Post, { nullable: true })
  post?: Post;

  @ManyToOne(() => Comment, { nullable: true })
  parentComment?: Comment;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  replies = new Collection<Comment>(this);

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt!: Date;
}
