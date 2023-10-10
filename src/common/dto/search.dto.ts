import { IsOptional } from 'class-validator';

export class SearchDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  size?: number;
}
