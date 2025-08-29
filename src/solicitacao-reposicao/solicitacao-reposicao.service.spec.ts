import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SolicitacaoReposicaoService } from './solicitacao-reposicao.service';
import { SolicitacaoReposicao } from './entities/solicitacao-reposicao.entity';
import { VariacaoProdutoService } from '../variacao-produto/variacao-produto.service';

describe('SolicitacaoReposicaoService', () => {
  let service: SolicitacaoReposicaoService;

  // Mock para o VariacaoProdutoService
  const mockVariacaoProdutoService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SolicitacaoReposicaoService,
        // Provider mock para o repositório de SolicitacaoReposicao
        {
          provide: getRepositoryToken(SolicitacaoReposicao),
          useValue: {},
        },
        // Provider mock para o VariacaoProdutoService
        {
          provide: VariacaoProdutoService,
          useValue: mockVariacaoProdutoService,
        },
      ],
    }).compile();

    service = module.get<SolicitacaoReposicaoService>(SolicitacaoReposicaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
