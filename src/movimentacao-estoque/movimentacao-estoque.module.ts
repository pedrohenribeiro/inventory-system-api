import { Module } from '@nestjs/common';
import { MovimentacaoEstoqueService } from './movimentacao-estoque.service';
import { MovimentacaoEstoqueController } from './movimentacao-estoque.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimentacaoEstoque } from './entities/movimentacao-estoque.entity';
import { VariacaoProdutoModule } from '../variacao-produto/variacao-produto.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovimentacaoEstoque]),
    VariacaoProdutoModule, // Importa para ter acesso ao VariacaoProdutoService
  ],
  controllers: [MovimentacaoEstoqueController],
  providers: [MovimentacaoEstoqueService],
  exports: [MovimentacaoEstoqueService], // Exporta o serviço para ser usado por outros módulos
})
export class MovimentacaoEstoqueModule {}
