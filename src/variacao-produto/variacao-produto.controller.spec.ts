
import { Test, TestingModule } from '@nestjs/testing';
import { VariacaoProdutoController } from './variacao-produto.controller';
import { VariacaoProdutoService } from './variacao-produto.service';

describe('VariacaoProdutoController', () => {
  let controller: VariacaoProdutoController;

  const mockVariacaoProdutoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VariacaoProdutoController],
      providers: [
        {
          provide: VariacaoProdutoService,
          useValue: mockVariacaoProdutoService,
        },
      ],
    }).compile();

    controller = module.get<VariacaoProdutoController>(VariacaoProdutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});