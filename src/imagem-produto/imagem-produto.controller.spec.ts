import { Test, TestingModule } from '@nestjs/testing';
import { ImagemProdutoController } from './imagem-produto.controller';
import { ImagemProdutoService } from './imagem-produto.service';

describe('ImagemProdutoController', () => {
  let controller: ImagemProdutoController;

  const mockImagemProdutoService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagemProdutoController],
      providers: [
        {
          provide: ImagemProdutoService,
          useValue: mockImagemProdutoService,
        },
      ],
    }).compile();

    controller = module.get<ImagemProdutoController>(ImagemProdutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
