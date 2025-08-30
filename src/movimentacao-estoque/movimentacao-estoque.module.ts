import { Module } from '@nestjs/common';
import { MovimentacaoEstoqueService } from './movimentacao-estoque.service';
import { MovimentacaoEstoqueController } from './movimentacao-estoque.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimentacaoEstoque } from './entities/movimentacao-estoque.entity';
import { VariacaoProdutoModule } from '../variacao-produto/variacao-produto.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovimentacaoEstoque]),
    VariacaoProdutoModule,
  ],
  controllers: [MovimentacaoEstoqueController],
  providers: [MovimentacaoEstoqueService],
  exports: [MovimentacaoEstoqueService],
})
export class MovimentacaoEstoqueModule {}
