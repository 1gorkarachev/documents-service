import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDocumentsTable1696845315740 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE "documents" (
            "id"          SERIAL       NOT NULL,
            "name"        VARCHAR(255) NOT NULL,
            "template_id" INT          NOT NULL,

            CONSTRAINT "PK_documents" PRIMARY KEY ("id"),
            CONSTRAINT "FK_template_id" FOREIGN KEY ("template_id") REFERENCES templates("id")
        );

        CREATE TABLE "documents_fields" (
            "id"          SERIAL       NOT NULL,
            "document_id" INT          NOT NULL,
            "field_id"    INT          NOT NULL,
            "value"       VARCHAR(255) NOT NULL,

            CONSTRAINT "PK_documents_fields" PRIMARY KEY ("id"),
            CONSTRAINT "FK_document_id"
              FOREIGN KEY ("document_id")
              REFERENCES documents("id")
              ON DELETE CASCADE
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        DROP TABLE "documents_fields";

        DROP TABLE "documents";
    `);
  }
}
