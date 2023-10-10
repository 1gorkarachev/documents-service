import {
  ArrayNotEmpty,
  IsDefined,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateDocumentFieldDto } from './create-document-field.dto';
import { Type } from 'class-transformer';

export class CreateDocumentDto {
  @IsDefined()
  @IsString()
  name: string;

  @IsDefined()
  @IsNumber()
  template_id: number;

  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentFieldDto)
  fields: CreateDocumentFieldDto[];
}
