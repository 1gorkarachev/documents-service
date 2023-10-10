import { IsDefined, IsEnum, IsString } from 'class-validator';
import { FieldTypeEnum } from 'src/common/enums';

export class TemplateFieldsDto {
  @IsDefined()
  @IsString()
  public readonly name!: string;

  @IsDefined()
  @IsEnum(FieldTypeEnum)
  public readonly type!: FieldTypeEnum;
}
