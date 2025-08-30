import { Module } from '@nestjs/common';
import { ImagemProdutoService } from './imagem-produto.service';
import { ImagemProdutoController } from './imagem-produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagemProduto } from './entities/imagem-produto.entity';
import { VariacaoProdutoModule } from '../variacao-produto/variacao-produto.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImagemProduto]),
    VariacaoProdutoModule,
  ],
  controllers: [ImagemProdutoController],
  providers: [ImagemProdutoService],
})
export class ImagemProdutoModule {}
