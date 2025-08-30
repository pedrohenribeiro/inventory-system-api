import { Test, TestingModule } from '@nestjs/testing';
import { SolicitacaoReposicaoController } from './solicitacao-reposicao.controller';
import { SolicitacaoReposicaoService } from './solicitacao-reposicao.service';

describe('SolicitacaoReposicaoController', () => {
  let controller: SolicitacaoReposicaoController;

  const mockSolicitacaoReposicaoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitacaoReposicaoController],
      providers: [
        {
          provide: SolicitacaoReposicaoService,
          useValue: mockSolicitacaoReposicaoService,
        },
      ],
    }).compile();

    controller = module.get<SolicitacaoReposicaoController>(SolicitacaoReposicaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
