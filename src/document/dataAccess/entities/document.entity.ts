import { TemplateEntity } from 'src/template/dataAccess/entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DocumentFieldEntity } from './document-field.entity';

@Entity({ name: 'documents' })
export class DocumentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  template_id: number;

  @OneToOne(() => TemplateEntity)
  @JoinColumn({
    name: 'template_id',
    referencedColumnName: 'id',
  })
  template: TemplateEntity;

  @OneToMany(() => DocumentFieldEntity, (document) => document.document, {
    cascade: true,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'document_id' })
  public fields: DocumentFieldEntity[];
}
