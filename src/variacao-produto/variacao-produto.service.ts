
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVariacaoProdutoDto } from './dto/create-variacao-produto.dto';
import { UpdateVariacaoProdutoDto } from './dto/update-variacao-produto.dto';
import { VariacaoProduto } from './entities/variacao-produto.entity';
import { ProdutosService } from '../produtos/produtos.service';

@Injectable()
export class VariacaoProdutoService {
  constructor(
    @InjectRepository(VariacaoProduto)
    private readonly variacaoRepository: Repository<VariacaoProduto>,
    private readonly produtosService: ProdutosService,
  ) {}

  async create(createVariacaoDto: CreateVariacaoProdutoDto): Promise<VariacaoProduto> {
    const { produtoId, ...restoDoDto } = createVariacaoDto;
    const produto = await this.produtosService.findOne(produtoId);

    const variacao = this.variacaoRepository.create({
      ...restoDoDto,
      produto,
    });

    return this.variacaoRepository.save(variacao);
  }

  findAll(): Promise<VariacaoProduto[]> {
    return this.variacaoRepository.find();
  }

  async findOne(id: number): Promise<VariacaoProduto> {
    const variacao = await this.variacaoRepository.findOneBy({ id });
    if (!variacao) {
      throw new NotFoundException(`Variação com o ID "${id}" não encontrada.`);
    }
    return variacao;
  }

  async update(id: number, updateVariacaoDto: UpdateVariacaoProdutoDto): Promise<VariacaoProduto> {
    const { produtoId, ...restoDoDto } = updateVariacaoDto;
    
    const variacao = await this.variacaoRepository.preload({
      id: id,
      ...restoDoDto,
    });

    if (!variacao) {
      throw new NotFoundException(`Variação com o ID "${id}" não encontrada.`);
    }

    if (produtoId) {
      const produto = await this.produtosService.findOne(produtoId);
      variacao.produto = produto;
    }

    return this.variacaoRepository.save(variacao);
  }

  async remove(id: number): Promise<void> {
    const result = await this.variacaoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Variação com o ID "${id}" não encontrada.`);
    }
  }
}