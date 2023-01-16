import { MigrationInterface, QueryRunner } from "typeorm";

export class rolesColumn1670829459317 implements MigrationInterface {
    name = 'rolesColumn1670829459317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "roles" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
    }

}
