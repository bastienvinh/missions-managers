-- Generate with dbml tools

CREATE TYPE "RoleEnum" AS ENUM (
  'ADMIN',
  'EDITOR',
  'USER',
  'GUEST'
);

CREATE TYPE "ContractTypes" AS ENUM (
  'Fulltime',
  'Permanent',
  'Temporary',
  'PartTime'
);

CREATE TABLE "Users" (
  "id" serial PRIMARY KEY,
  "username" varchar(200),
  "email" varchar(200) UNIQUE,
  "password" varchar(300),
  "role" RoleEnum
);

CREATE TABLE "Missions" (
  "id" serial PRIMARY KEY,
  "company" varchar(300),
  "description" text,
  "expiration_date" timestamp,
  "like_level" integer,
  "salary" double,
  "type" ContractTypes,
  "requirements" text,
  "advantages" text,
  "benefits" text,
  "author_id" integer
);

CREATE TABLE "Technologies" (
  "id" serial PRIMARY KEY,
  "name" varchar(100),
  "description" text,
  "value" integer
);

CREATE TABLE "MissionsHasTechnologies" (
  "techno_id" integer,
  "mission_id" integer,
  PRIMARY KEY ("techno_id", "mission_id")
);

ALTER TABLE "Missions" ADD FOREIGN KEY ("author_id") REFERENCES "Users" ("id");

ALTER TABLE "MissionsHasTechnologies" ADD FOREIGN KEY ("techno_id") REFERENCES "Technologies" ("id");

ALTER TABLE "MissionsHasTechnologies" ADD FOREIGN KEY ("mission_id") REFERENCES "Missions" ("id");
