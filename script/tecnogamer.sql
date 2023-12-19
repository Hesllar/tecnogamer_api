CREATE TYPE "product_status" AS ENUM (
  'in_stock',
  'out_of_sotck',
  'running_low'
);

CREATE TYPE "order_status" AS ENUM (
  'placed',
  'confirm',
  'processed',
  'complete'
);

CREATE TABLE "category" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar(200) UNIQUE,
  "description" text,
  "created_at" timestamp DEFAULT 'now()',
  "updated_at" timestamp
);

CREATE TABLE "brand" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar(200) UNIQUE,
  "description" text,
  "created_at" timestamp DEFAULT 'now()',
  "updated_at" timestamp
);

CREATE TABLE "user" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "email" varchar UNIQUE,
  "name" varchar,
  "password" varchar,
  "description" text,
  "role_user_id" int,
  "created_at" timestamp DEFAULT 'now()',
  "updated_at" timestamp
);

CREATE TABLE "product" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar(200) UNIQUE,
  "price" int,
  "status" product_status,
  "stock" int,
  "category_id" int,
  "brand_id" int,
  "created_at" timestamp DEFAULT 'now()',
  "updated_at" timestamp
);

CREATE TABLE "order" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "status" order_status,
  "user_id" int,
  "total" int,
  "created_at" timestamp DEFAULT 'now()'
);

CREATE TABLE "order_item" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "order_id" int,
  "product_id" int,
  "quantity" int
);

CREATE TABLE "role_user" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "name" varchar,
  "description" text
);

CREATE TABLE "tecnogamer_log" (
  "id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "code" int,
  "message" varchar,
  "method" varchar,
  "path" varchar,
  "status_code" int,
  "is_error" boolean,
  "request" text,
  "stack" text,
  "username" varchar,
  "headers" text,
  "level" varchar,
  "created_at" timestamp DEFAULT 'now()'
);

ALTER TABLE "user" ADD FOREIGN KEY ("role_user_id") REFERENCES "role_user" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("brand_id") REFERENCES "brand" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "order_item" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "order_item" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");
