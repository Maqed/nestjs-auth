import { Migration } from '@mikro-orm/migrations';

export class Migration20241130193802 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "tag" ("name" varchar(255) not null, constraint "tag_pkey" primary key ("name"));`);

    this.addSql(`create table "post" ("id" uuid not null, "title" varchar(255) not null, "content" varchar(255) not null, "author_id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "post_pkey" primary key ("id"));`);

    this.addSql(`create table "post_tags" ("post_id" uuid not null, "tag_name" varchar(255) not null, constraint "post_tags_pkey" primary key ("post_id", "tag_name"));`);

    this.addSql(`create table "comment" ("id" uuid not null, "content" varchar(255) not null, "post_id" uuid null, "parent_comment_id" uuid null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "comment_pkey" primary key ("id"));`);

    this.addSql(`alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;`);

    this.addSql(`alter table "post_tags" add constraint "post_tags_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "post_tags" add constraint "post_tags_tag_name_foreign" foreign key ("tag_name") references "tag" ("name") on update cascade on delete cascade;`);

    this.addSql(`alter table "comment" add constraint "comment_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "comment" add constraint "comment_parent_comment_id_foreign" foreign key ("parent_comment_id") references "comment" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "post_tags" drop constraint "post_tags_tag_name_foreign";`);

    this.addSql(`alter table "post_tags" drop constraint "post_tags_post_id_foreign";`);

    this.addSql(`alter table "comment" drop constraint "comment_post_id_foreign";`);

    this.addSql(`alter table "comment" drop constraint "comment_parent_comment_id_foreign";`);

    this.addSql(`drop table if exists "tag" cascade;`);

    this.addSql(`drop table if exists "post" cascade;`);

    this.addSql(`drop table if exists "post_tags" cascade;`);

    this.addSql(`drop table if exists "comment" cascade;`);

    this.addSql(`alter table "user" drop constraint "user_email_unique";`);
  }

}
