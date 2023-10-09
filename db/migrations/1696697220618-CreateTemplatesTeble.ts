import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTemplatesTeble1696697220618 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE "templates" (
            "id"   SERIAL       NOT NULL,
            "name" VARCHAR(255) NOT NULL,

            CONSTRAINT "PK_templates" PRIMARY KEY ("id")
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE "templates"`);
  }
}
