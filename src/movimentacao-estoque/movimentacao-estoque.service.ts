import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { VariacaoProdutoService } from '../variacao-produto/variacao-produto.service';
import { CreateMovimentacaoEstoqueDto } from './dto/create-movimentacao-estoque.dto';
import { MovimentacaoEstoque } from './entities/movimentacao-estoque.entity';
import { VariacaoProduto } from '../variacao-produto/entities/variacao-produto.entity';

@Injectable()
export class MovimentacaoEstoqueService {
  constructor(
    @InjectRepository(MovimentacaoEstoque)
    private readonly movimentacaoRepository: Repository<MovimentacaoEstoque>,
    private readonly variacaoProdutoService: VariacaoProdutoService,
    private readonly dataSource: DataSource,
  ) {}

  async registrarMovimentacao(
    createDto: CreateMovimentacaoEstoqueDto,
  ): Promise<MovimentacaoEstoque> {
    const { variacaoId, alteracao_quantidade, ...restoDto } = createDto;

    return this.dataSource.transaction(async (manager) => {

      const variacao = await manager.findOneBy(VariacaoProduto, {
        id: variacaoId,
      });

      if (!variacao) {
        throw new BadRequestException(
          `Variação de produto com ID ${variacaoId} não encontrada.`,
        );
      }

      const novaQuantidade =
        variacao.quantidade_em_estoque + alteracao_quantidade;

      if (novaQuantidade < 0) {
        throw new BadRequestException('Estoque insuficiente para esta operação.');
      }

      variacao.quantidade_em_estoque = novaQuantidade;
      await manager.save(VariacaoProduto, variacao);

      const movimentacao = manager.create(MovimentacaoEstoque, {
        ...restoDto,
        alteracao_quantidade,
        variacao,
      });

      return manager.save(MovimentacaoEstoque, movimentacao);
    });
  }

  async findByVariacaoId(
    variacaoId: number,
  ): Promise<MovimentacaoEstoque[]> {
    await this.variacaoProdutoService.findOne(variacaoId);

    return this.movimentacaoRepository.find({
      where: { variacao: { id: variacaoId } },
      order: { criadoEm: 'DESC' },
    });
  }
}

