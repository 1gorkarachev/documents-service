import { DocumentFieldEntity } from 'src/document/dataAccess/entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('fields')
export class FieldEntity {
  public static get columns(): Array<keyof FieldEntity> {
    return ['id', 'name', 'type'];
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @OneToMany(() => DocumentFieldEntity, (document) => document.document)
  @JoinColumn({ name: 'id', referencedColumnName: 'field_id' })
  public documents: DocumentFieldEntity[];
}
