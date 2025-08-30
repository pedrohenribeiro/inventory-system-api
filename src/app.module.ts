import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutosModule } from './produtos/produtos.module';
import { TiposModule } from './tipos/tipos.module';
import { VariacaoProdutoModule } from './variacao-produto/variacao-produto.module';
import { SolicitacaoReposicaoModule } from './solicitacao-reposicao/solicitacao-reposicao.module';
import { ImagemProdutoModule } from './imagem-produto/imagem-produto.module';
import { MovimentacaoEstoqueModule } from './movimentacao-estoque/movimentacao-estoque.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ProdutosModule,
    TiposModule,
    VariacaoProdutoModule,
    SolicitacaoReposicaoModule,
    ImagemProdutoModule,
    MovimentacaoEstoqueModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
