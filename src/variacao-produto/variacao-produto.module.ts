import { Module } from '@nestjs/common';
import { VariacaoProdutoService } from './variacao-produto.service';
import { VariacaoProdutoController } from './variacao-produto.controller';
import { ProdutosModule } from '../produtos/produtos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariacaoProduto } from './entities/variacao-produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VariacaoProduto]), ProdutosModule],
  controllers: [VariacaoProdutoController],
  providers: [VariacaoProdutoService],
  exports: [VariacaoProdutoService],
})
export class VariacaoProdutoModule {}