import { Module } from '@nestjs/common';
import { SolicitacaoReposicaoService } from './solicitacao-reposicao.service';
import { SolicitacaoReposicaoController } from './solicitacao-reposicao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitacaoReposicao } from './entities/solicitacao-reposicao.entity';
import { VariacaoProdutoModule } from '../variacao-produto/variacao-produto.module';
import { MovimentacaoEstoqueModule } from '../movimentacao-estoque/movimentacao-estoque.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SolicitacaoReposicao]),
    VariacaoProdutoModule,
    MovimentacaoEstoqueModule,
  ],
  controllers: [SolicitacaoReposicaoController],
  providers: [SolicitacaoReposicaoService],
})
export class SolicitacaoReposicaoModule {}
