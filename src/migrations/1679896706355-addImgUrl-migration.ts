import { MigrationInterface, QueryRunner } from "typeorm";

export class addImgUrlMigration1679896706355 implements MigrationInterface {
    name = 'addImgUrlMigration1679896706355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "image"`);
    }

}
