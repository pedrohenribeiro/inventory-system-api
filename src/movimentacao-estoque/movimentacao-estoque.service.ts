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
    private readonly dataSource: DataSource, // Injete o DataSource para transações
  ) {}

  /**
   * Método central para registrar uma movimentação de estoque e atualizar a quantidade da variação.
   * Utiliza uma transação para garantir a consistência dos dados.
   * Este método é projetado para ser chamado por outros serviços (ex: ao concluir uma reposição).
   */
  async registrarMovimentacao(
    createDto: CreateMovimentacaoEstoqueDto,
  ): Promise<MovimentacaoEstoque> {
    const { variacaoId, alteracao_quantidade, ...restoDto } = createDto;

    // A transação garante que todas as operações de banco de dados dentro dela
    // sejam concluídas com sucesso, ou nenhuma delas é aplicada.
    return this.dataSource.transaction(async (manager) => {
      // Usamos o 'manager' da transação para buscar a variação, garantindo que ela seja "travada" para esta operação.
      const variacao = await manager.findOneBy(VariacaoProduto, {
        id: variacaoId,
      });

      if (!variacao) {
        throw new BadRequestException(
          `Variação de produto com ID ${variacaoId} não encontrada.`,
        );
      }

      // Calcula a nova quantidade em estoque
      const novaQuantidade =
        variacao.quantidade_em_estoque + alteracao_quantidade;

      // Valida se o estoque ficaria negativo
      if (novaQuantidade < 0) {
        throw new BadRequestException('Estoque insuficiente para esta operação.');
      }

      // Atualiza a quantidade na entidade de variação usando o 'manager' da transação
      variacao.quantidade_em_estoque = novaQuantidade;
      await manager.save(VariacaoProduto, variacao);

      // Cria a nova movimentação de estoque
      const movimentacao = manager.create(MovimentacaoEstoque, {
        ...restoDto,
        alteracao_quantidade,
        variacao, // Associa a entidade completa da variação
      });

      // Salva a movimentação usando o 'manager' da transação e a retorna
      return manager.save(MovimentacaoEstoque, movimentacao);
    });
  }

  /**
   * Busca o histórico de movimentações para uma variação de produto específica.
   */
  async findByVariacaoId(
    variacaoId: number,
  ): Promise<MovimentacaoEstoque[]> {
    // Primeiro, valida se a variação de produto realmente existe
    await this.variacaoProdutoService.findOne(variacaoId);

    return this.movimentacaoRepository.find({
      where: { variacao: { id: variacaoId } },
      order: { criadoEm: 'DESC' }, // Ordena da mais recente para a mais antiga
    });
  }
}

