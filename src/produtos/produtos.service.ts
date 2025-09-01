import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';
import { TiposService } from '../tipos/tipos.service';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    private readonly tiposService: TiposService,
  ) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const { tipoId, ...restoDoDto } = createProdutoDto;
    const tipo = await this.tiposService.findOne(tipoId);
    const produto = this.produtoRepository.create({
      ...restoDoDto,
      tipo,
    });

    return this.produtoRepository.save(produto);
  }

  findAll(): Promise<Produto[]> {
    return this.produtoRepository.find();
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOneBy({ id });

    if (!produto) {
      throw new NotFoundException(`Produto com o ID "${id}" não encontrado.`);
    }

    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
    const produto = await this.produtoRepository.preload({
      id: id,
      ...updateProdutoDto,
    });

    if (!produto) {
      throw new NotFoundException(`Produto com o ID "${id}" não encontrado.`);
    }

    if (updateProdutoDto.tipoId) {
      const novoTipo = await this.tiposService.findOne(updateProdutoDto.tipoId);
      produto.tipo = novoTipo;
    }

    return this.produtoRepository.save(produto);
  }

  async remove(id: number): Promise<void> {
    const result = await this.produtoRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Produto com o ID "${id}" não encontrado.`);
    }
  }
}
