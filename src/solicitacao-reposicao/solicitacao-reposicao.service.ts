import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSolicitacaoReposicaoDto } from './dto/create-solicitacao-reposicao.dto';
import { UpdateSolicitacaoReposicaoDto } from './dto/update-solicitacao-reposicao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SolicitacaoReposicao } from './entities/solicitacao-reposicao.entity';
import { Repository } from 'typeorm';
import { VariacaoProdutoService } from '../variacao-produto/variacao-produto.service';
import { MovimentacaoEstoqueService } from '../movimentacao-estoque/movimentacao-estoque.service';
import { TipoTransacao } from '../movimentacao-estoque/entities/movimentacao-estoque.entity';

@Injectable()
export class SolicitacaoReposicaoService {
  constructor(
    @InjectRepository(SolicitacaoReposicao)
    private readonly solicitacaoRepository: Repository<SolicitacaoReposicao>,
    private readonly variacaoProdutoService: VariacaoProdutoService,
    private readonly movimentacaoEstoqueService: MovimentacaoEstoqueService,
  ) {}

  async create(
    createDto: CreateSolicitacaoReposicaoDto,
  ): Promise<SolicitacaoReposicao> {
    const { variacaoId, ...restoDoDto } = createDto;
    const variacao = await this.variacaoProdutoService.findOne(variacaoId);

    const solicitacao = this.solicitacaoRepository.create({
      ...restoDoDto,
      variacao,
    });

    return this.solicitacaoRepository.save(solicitacao);
  }

  findAll(): Promise<SolicitacaoReposicao[]> {
    return this.solicitacaoRepository.find();
  }

  async findOne(id: number): Promise<SolicitacaoReposicao> {
    const solicitacao = await this.solicitacaoRepository.findOne({
      where: { id },
      relations: ['variacao'],
    });
    if (!solicitacao) {
      throw new NotFoundException(`Solicitação com o ID "${id}" não encontrada.`);
    }
    return solicitacao;
  }

  async update(
    id: number,
    updateDto: UpdateSolicitacaoReposicaoDto,
  ): Promise<SolicitacaoReposicao> {
    const solicitacaoExistente = await this.findOne(id);
    const eraConcluido = solicitacaoExistente.concluido;
    const solicitacaoAtualizada = this.solicitacaoRepository.merge(
      solicitacaoExistente,
      updateDto,
    );

    if (solicitacaoAtualizada.concluido && !eraConcluido) {
      await this.movimentacaoEstoqueService.registrarMovimentacao({
        variacaoId: solicitacaoExistente.variacao.id,
        tipo_transacao: TipoTransacao.PRODUCAO_FINALIZADA,
        alteracao_quantidade: solicitacaoExistente.quantidade_solicitada,
        observacoes: `Produção finalizada referente à solicitação #${id}`,
      });
    }
    return this.solicitacaoRepository.save(solicitacaoAtualizada);
  }

  async remove(id: number): Promise<void> {
    const result = await this.solicitacaoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Solicitação com o ID "${id}" não encontrada.`);
    }
  }
}
