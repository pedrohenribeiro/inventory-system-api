import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { MovimentacaoEstoqueService } from './movimentacao-estoque.service';
import { MovimentacaoEstoque } from './entities/movimentacao-estoque.entity';
import { VariacaoProdutoService } from '../variacao-produto/variacao-produto.service';

describe('MovimentacaoEstoqueService', () => {
  let service: MovimentacaoEstoqueService;

  const mockVariacaoProdutoService = {
    findOne: jest.fn(),
  };

  const mockDataSource = {
    transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovimentacaoEstoqueService,
        {
          provide: getRepositoryToken(MovimentacaoEstoque),
          useValue: {},
        },

        {
          provide: VariacaoProdutoService,
          useValue: mockVariacaoProdutoService,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<MovimentacaoEstoqueService>(MovimentacaoEstoqueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
