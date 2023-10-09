import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
