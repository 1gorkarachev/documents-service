import { IsOptional } from 'class-validator';

export class SearchTemplatesDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  size?: number;
}
