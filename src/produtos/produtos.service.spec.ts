import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProdutosService } from './produtos.service';
import { Produto } from './entities/produto.entity';
import { TiposService } from '../tipos/tipos.service';

describe('ProdutosService', () => {
  let service: ProdutosService;

  const mockTiposService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutosService,
        {
          provide: getRepositoryToken(Produto),
          useValue: {},
        },
        {
          provide: TiposService,
          useValue: mockTiposService,
        },
      ],
    }).compile();

    service = module.get<ProdutosService>(ProdutosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
