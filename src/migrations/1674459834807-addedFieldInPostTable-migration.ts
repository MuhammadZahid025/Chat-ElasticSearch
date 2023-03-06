import { MigrationInterface, QueryRunner } from "typeorm";

export class addedFieldInPostTableMigration1674459834807 implements MigrationInterface {
    name = 'addedFieldInPostTableMigration1674459834807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "title" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "title" integer NOT NULL`);
    }

}
