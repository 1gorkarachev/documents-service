import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DocumentEntity } from './document.entity';
import { FieldEntity } from 'src/common/entities';

@Entity({ name: 'documents_fields' })
export class DocumentFieldEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  document_id: number;

  @Column()
  field_id: number;

  @Column()
  value: string;

  @ManyToOne(() => DocumentEntity, (document) => document.fields)
  @JoinColumn({ name: 'document_id', referencedColumnName: 'id' })
  public document: DocumentEntity;

  @ManyToOne(() => FieldEntity, (field) => field.documents)
  @JoinColumn({ name: 'field_id', referencedColumnName: 'id' })
  public field: FieldEntity;
}
