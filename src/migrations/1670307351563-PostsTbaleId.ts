import { MigrationInterface, QueryRunner } from "typeorm";

export class PostsTbaleId1670307351563 implements MigrationInterface {
    name = 'PostsTbaleId1670307351563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "posts_id_seq" OWNED BY "posts"."id"`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "id" SET DEFAULT nextval('"posts_id_seq"')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "posts_id_seq"`);
    }

}
