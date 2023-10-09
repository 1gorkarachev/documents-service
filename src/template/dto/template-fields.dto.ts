import { IsDefined, IsEnum, IsString } from 'class-validator';

enum FieldTypeEnum {
  string = 'string',
  number = 'number',
  date = 'date',
}

export class TemplateFieldsDto {
  @IsDefined()
  @IsString()
  public readonly name!: string;

  @IsDefined()
  @IsEnum(FieldTypeEnum)
  public readonly type!: FieldTypeEnum;
}
