import { MigrationInterface, QueryRunner } from 'typeorm';

export class nameOfMigration1669990021792 implements MigrationInterface {
  name = 'nameOfMigration1669990021792';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}
