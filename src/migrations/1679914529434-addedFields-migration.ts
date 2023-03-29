import { MigrationInterface, QueryRunner } from "typeorm";

export class addedFieldsMigration1679914529434 implements MigrationInterface {
    name = 'addedFieldsMigration1679914529434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "tag" character varying`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "minutesToRead" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "minutesToRead"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "tag"`);
    }

}
