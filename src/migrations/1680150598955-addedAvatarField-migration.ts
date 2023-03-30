import { MigrationInterface, QueryRunner } from "typeorm";

export class addedAvatarFieldMigration1680150598955 implements MigrationInterface {
    name = 'addedAvatarFieldMigration1680150598955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "avatar" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
    }

}
