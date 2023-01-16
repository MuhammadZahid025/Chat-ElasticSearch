import { MigrationInterface, QueryRunner } from "typeorm";

export class postsSelfRefrencing1670480529272 implements MigrationInterface {
    name = 'postsSelfRefrencing1670480529272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "replies" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "commentsId" integer, CONSTRAINT "PK_08f619ebe431e27e9d206bea132" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "text" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "parentId" integer`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_070218af41a90b3a4522d8a70b4" FOREIGN KEY ("parentId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "replies" ADD CONSTRAINT "FK_8179bb1e10a4eff17893e958065" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "replies" DROP CONSTRAINT "FK_8179bb1e10a4eff17893e958065"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_070218af41a90b3a4522d8a70b4"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "parentId"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "replies"`);
    }

}
