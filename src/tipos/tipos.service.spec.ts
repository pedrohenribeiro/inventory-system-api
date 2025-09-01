import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TiposService } from './tipos.service';
import { Tipo } from './entities/tipo.entity';

describe('TiposService', () => {
  let service: TiposService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TiposService,
        {
          provide: getRepositoryToken(Tipo),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TiposService>(TiposService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
