import { MigrationInterface, QueryRunner } from 'typeorm';

export class commentsRelation1670495318672 implements MigrationInterface {
  name = 'commentsRelation1670495318672';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_070218af41a90b3a4522d8a70b4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "replies" DROP CONSTRAINT "FK_8179bb1e10a4eff17893e958065"`,
    );
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "parentId"`);
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "postId"`);
    await queryRunner.query(`ALTER TABLE "replies" DROP COLUMN "commentsId"`);
    await queryRunner.query(`ALTER TABLE "comments" ADD "userId" integer`);
    await queryRunner.query(`ALTER TABLE "comments" ADD "postsId" integer`);
    await queryRunner.query(`ALTER TABLE "comments" ADD "parentId" integer`);
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_3a72cc828d53d3322d7eca3d07b" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_8770bd9030a3d13c5f79a7d2e81" FOREIGN KEY ("parentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_8770bd9030a3d13c5f79a7d2e81"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_3a72cc828d53d3322d7eca3d07b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`,
    );
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "parentId"`);
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "postsId"`);
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "replies" ADD "commentsId" integer`);
    await queryRunner.query(`ALTER TABLE "comments" ADD "postId" integer`);
    await queryRunner.query(`ALTER TABLE "posts" ADD "parentId" integer`);
    await queryRunner.query(
      `ALTER TABLE "replies" ADD CONSTRAINT "FK_8179bb1e10a4eff17893e958065" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_070218af41a90b3a4522d8a70b4" FOREIGN KEY ("parentId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
