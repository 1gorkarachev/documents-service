import {
  ArrayNotEmpty,
  IsDefined,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TemplateFieldsDto } from './template-fields.dto';
import { Type } from 'class-transformer';

export class CreateTemplateDto {
  @IsDefined()
  @IsString()
  public readonly name!: string;

  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => TemplateFieldsDto)
  public readonly fields!: TemplateFieldsDto[];
}
