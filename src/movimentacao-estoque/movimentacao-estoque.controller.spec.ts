import { Test, TestingModule } from '@nestjs/testing';
import { MovimentacaoEstoqueController } from './movimentacao-estoque.controller';
import { MovimentacaoEstoqueService } from './movimentacao-estoque.service';

describe('MovimentacaoEstoqueController', () => {
  let controller: MovimentacaoEstoqueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovimentacaoEstoqueController],
      providers: [MovimentacaoEstoqueService],
    }).compile();

    controller = module.get<MovimentacaoEstoqueController>(MovimentacaoEstoqueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
