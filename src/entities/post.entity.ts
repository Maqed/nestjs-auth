import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  OneToMany,
  ManyToMany,
  Collection,
} from '@mikro-orm/core';
import { IsNotEmpty, MinLength } from 'class-validator';
import { v4 } from 'uuid';

// Entities
import { User } from './user.entity';
import { Tag } from './tag.entity';
import { Comment } from './comment.entity';

@Entity()
export class Post {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  @IsNotEmpty()
  @MinLength(3)
  title!: string;

  @Property()
  @IsNotEmpty()
  content!: string;

  @ManyToOne(() => User)
  author!: User;

  @ManyToMany(() => Tag)
  tags = new Collection<Tag>(this);

  @OneToMany(() => Comment, (comment) => comment.post)
  comments = new Collection<Comment>(this);

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt!: Date;
}
