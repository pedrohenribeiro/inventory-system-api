import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SolicitacaoReposicaoService } from './solicitacao-reposicao.service';
import { SolicitacaoReposicao } from './entities/solicitacao-reposicao.entity';
import { VariacaoProdutoService } from '../variacao-produto/variacao-produto.service';
import { MovimentacaoEstoqueService } from '../movimentacao-estoque/movimentacao-estoque.service';

describe('SolicitacaoReposicaoService', () => {
  let service: SolicitacaoReposicaoService;

  const mockVariacaoProdutoService = {
    findOne: jest.fn(),
  };

  const mockMovimentacaoEstoqueService = {
    registrarMovimentacao: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SolicitacaoReposicaoService,
        {
          provide: getRepositoryToken(SolicitacaoReposicao),
          useValue: {},
        },
        {
          provide: VariacaoProdutoService,
          useValue: mockVariacaoProdutoService,
        },
        {
          provide: MovimentacaoEstoqueService,
          useValue: mockMovimentacaoEstoqueService,
        },
      ],
    }).compile();

    service = module.get<SolicitacaoReposicaoService>(
      SolicitacaoReposicaoService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
