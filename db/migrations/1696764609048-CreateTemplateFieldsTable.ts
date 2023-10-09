import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTemplateFieldsTable1696764609048
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TYPE field_type AS ENUM ('string', 'number', 'date');

        CREATE TABLE "fields" (
            "id"   SERIAL       NOT NULL,
            "name" VARCHAR(255) NOT NULL,
            "type" field_type   NOT NULL,

            CONSTRAINT "PK_fields" PRIMARY KEY ("id")
        );

        ALTER TABLE fields ADD CONSTRAINT fields_unique_name_type UNIQUE (name, type);

        CREATE TABLE "templates_fields" (
            "template_id" INT NOT NULL,
            "field_id"    INT NOT NULL,

            CONSTRAINT "FK_template_id" FOREIGN KEY ("template_id") REFERENCES templates("id"),
            CONSTRAINT "FK_field_id" FOREIGN KEY ("field_id") REFERENCES fields("id")
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE "templates_fields";

        DROP TABLE "fields";

        DROP TYPE field_type;
    `);
  }
}
