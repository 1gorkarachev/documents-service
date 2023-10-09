import { FieldEntity } from 'src/common/entities';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'templates' })
export class TemplateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => FieldEntity)
  @JoinTable({
    name: 'templates_fields',
    joinColumn: { name: 'template_id' },
    inverseJoinColumn: { name: 'field_id' },
  })
  fields: FieldEntity[];
}
