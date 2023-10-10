import { Injectable } from '@nestjs/common';
import { DocumentEntity } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

interface ISearchDocumentsParams {
  where?: {
    id?: number;
  };
  skip?: number;
  take?: number;
}

@Injectable()
export class SearchDocumentsQuery {
  public constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
  ) {}

  public execute({
    where,
    skip,
    take,
  }: ISearchDocumentsParams): Promise<DocumentEntity[]> {
    return this.documentRepository.find({
      where,
      relations: ['template', 'fields.field'],
      take: take ?? undefined,
      skip: skip ? skip * take : undefined,
    });
  }
}
