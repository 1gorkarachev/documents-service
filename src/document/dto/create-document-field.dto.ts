import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateDocumentFieldDto {
  @IsDefined()
  @IsNumber()
  id: number;

  @IsDefined()
  @IsString()
  value: string;
}
