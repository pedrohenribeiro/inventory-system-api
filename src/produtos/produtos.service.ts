import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';
import { TiposService } from '../tipos/tipos.service'; // Importe o TiposService

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    private readonly tiposService: TiposService, // Injete o TiposService
  ) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    // Separa o tipoId do resto dos dados
    const { tipoId, ...restoDoDto } = createProdutoDto;

    // Busca a entidade 'Tipo' pelo ID fornecido
    const tipo = await this.tiposService.findOne(tipoId);
    // Se não encontrar, o findOne do tiposService já vai lançar um erro 404

    // Cria a instância do produto, combinando os dados do DTO e a entidade 'Tipo' encontrada
    const produto = this.produtoRepository.create({
      ...restoDoDto,
      tipo, // Associa a entidade completa
    });

    return this.produtoRepository.save(produto);
  }

  findAll(): Promise<Produto[]> {
    // Graças ao 'eager: true' na entidade, o tipo já virá junto automaticamente
    return this.produtoRepository.find();
  }

  async findOne(id: number): Promise<Produto> {
    // Graças ao 'eager: true' na entidade, o tipo já virá junto automaticamente
    const produto = await this.produtoRepository.findOneBy({ id });

    if (!produto) {
      throw new NotFoundException(`Produto com o ID "${id}" não encontrado.`);
    }

    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
    // O 'preload' é uma forma segura de carregar e mesclar o DTO.
    // Ele encontra o produto pelo ID e aplica as alterações do DTO.
    const produto = await this.produtoRepository.preload({
      id: id,
      ...updateProdutoDto,
    });

    if (!produto) {
      throw new NotFoundException(`Produto com o ID "${id}" não encontrado.`);
    }
    
    // Se um novo tipoId foi fornecido, busca a nova entidade 'Tipo' e a associa.
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
