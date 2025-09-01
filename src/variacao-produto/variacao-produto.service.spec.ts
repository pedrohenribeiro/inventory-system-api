import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VariacaoProdutoService } from './variacao-produto.service';
import { VariacaoProduto } from './entities/variacao-produto.entity';
import { ProdutosService } from '../produtos/produtos.service';

describe('VariacaoProdutoService', () => {
  let service: VariacaoProdutoService;

  const mockProdutosService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VariacaoProdutoService,
        {
          provide: getRepositoryToken(VariacaoProduto),
          useValue: {},
        },
        {
          provide: ProdutosService,
          useValue: mockProdutosService,
        },
      ],
    }).compile();

    service = module.get<VariacaoProdutoService>(VariacaoProdutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});