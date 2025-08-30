import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ImagemProdutoService } from './imagem-produto.service';
import { ImagemProduto } from './entities/imagem-produto.entity';
import { VariacaoProdutoService } from '../variacao-produto/variacao-produto.service';

describe('ImagemProdutoService', () => {
  let service: ImagemProdutoService;

  const mockVariacaoProdutoService = {
    findOne: jest.fn(),
  };

  const mockImagemProdutoRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    preload: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagemProdutoService,
        {
          provide: getRepositoryToken(ImagemProduto),
          useValue: mockImagemProdutoRepository,
        },
        {
          provide: VariacaoProdutoService,
          useValue: mockVariacaoProdutoService,
        },
      ],
    }).compile();

    service = module.get<ImagemProdutoService>(ImagemProdutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
