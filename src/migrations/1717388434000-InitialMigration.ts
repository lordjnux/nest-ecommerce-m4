import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1717716779926 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "name" character varying(50) NOT NULL, 
            "email" character varying(50) NOT NULL, 
            "password" character varying(20) NOT NULL, 
            "address" character varying, 
            "phone" integer, 
            "country" character varying, 
            "city" character varying, 
            "admin" boolean NOT NULL DEFAULT false, 
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);

    await queryRunner.query(`CREATE TABLE "categories" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "name" character varying(50) NOT NULL, 
            CONSTRAINT "PK_24dbc6122c97a7a47e5c5c118ab" PRIMARY KEY ("id"))`);

    await queryRunner.query(`CREATE TABLE "products" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "name" character varying(50) NOT NULL, 
            "description" text NOT NULL, 
            "price" numeric(10,2) NOT NULL, 
            "stock" integer NOT NULL, 
            "img_url" character varying(255) DEFAULT 'https://agrimart.in/uploads/vendor_banner_image/default.jpg', 
            "category_id" uuid NOT NULL, 
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"), 
            CONSTRAINT "FK_category" FOREIGN KEY ("category_id") REFERENCES "categories" ("id"))`);

    await queryRunner.query(`CREATE TABLE "orders" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "date" TIMESTAMP NOT NULL, 
            "user_id" uuid, 
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"), 
            CONSTRAINT "FK_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id"))`);

    await queryRunner.query(`CREATE TABLE "order_details" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "price" numeric(10,2) NOT NULL, 
            "order_id" uuid NOT NULL, 
            CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"), 
            CONSTRAINT "FK_order" FOREIGN KEY ("order_id") REFERENCES "orders" ("id"))`);

    await queryRunner.query(`CREATE TABLE "order_details_products" (
            "order_details_id" uuid NOT NULL, 
            "product_id" uuid NOT NULL, 
            CONSTRAINT "PK_0e22d1b7d1f9f1f9f1f9f1f9f1f" PRIMARY KEY ("order_details_id", "product_id"), 
            CONSTRAINT "FK_order_details" FOREIGN KEY ("order_details_id") REFERENCES "order_details" ("id") ON DELETE CASCADE, 
            CONSTRAINT "FK_product" FOREIGN KEY ("product_id") REFERENCES "products" ("id") ON DELETE CASCADE)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "order_details_products"`);
    await queryRunner.query(`DROP TABLE "order_details"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
