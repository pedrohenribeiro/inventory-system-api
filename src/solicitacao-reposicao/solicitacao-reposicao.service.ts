import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSolicitacaoReposicaoDto } from './dto/create-solicitacao-reposicao.dto';
import { UpdateSolicitacaoReposicaoDto } from './dto/update-solicitacao-reposicao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SolicitacaoReposicao } from './entities/solicitacao-reposicao.entity';
import { Repository } from 'typeorm';
import { VariacaoProdutoService } from '../variacao-produto/variacao-produto.service';

@Injectable()
export class SolicitacaoReposicaoService {
  constructor(
    @InjectRepository(SolicitacaoReposicao)
    private readonly solicitacaoRepository: Repository<SolicitacaoReposicao>,
    private readonly variacaoProdutoService: VariacaoProdutoService,
  ) {}

  async create(createDto: CreateSolicitacaoReposicaoDto): Promise<SolicitacaoReposicao> {
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
    const solicitacao = await this.solicitacaoRepository.findOneBy({ id });
    if (!solicitacao) {
      throw new NotFoundException(`Solicitação com o ID "${id}" não encontrada.`);
    }
    return solicitacao;
  }

  async update(id: number, updateDto: UpdateSolicitacaoReposicaoDto): Promise<SolicitacaoReposicao> {
    const { variacaoId, ...restoDoDto } = updateDto;
    
    const solicitacao = await this.solicitacaoRepository.preload({
      id: id,
      ...restoDoDto,
    });

    if (!solicitacao) {
      throw new NotFoundException(`Solicitação com o ID "${id}" não encontrada.`);
    }

    if (variacaoId) {
      const variacao = await this.variacaoProdutoService.findOne(variacaoId);
      solicitacao.variacao = variacao;
    }

    return this.solicitacaoRepository.save(solicitacao);
  }

  async remove(id: number): Promise<void> {
    const result = await this.solicitacaoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Solicitação com o ID "${id}" não encontrada.`);
    }
  }
}
