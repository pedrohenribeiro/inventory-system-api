import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImagemProdutoDto } from './dto/create-imagem-produto.dto';
import { UpdateImagemProdutoDto } from './dto/update-imagem-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ImagemProduto } from './entities/imagem-produto.entity';
import { Repository } from 'typeorm';
import { VariacaoProdutoService } from '../variacao-produto/variacao-produto.service';

@Injectable()
export class ImagemProdutoService {
  constructor(
    @InjectRepository(ImagemProduto)
    private readonly imagemRepository: Repository<ImagemProduto>,
    private readonly variacaoProdutoService: VariacaoProdutoService,
  ) {}

  async create(createDto: CreateImagemProdutoDto): Promise<ImagemProduto> {
    const { variacaoId, ...restoDoDto } = createDto;
    const variacao = await this.variacaoProdutoService.findOne(variacaoId);

    const imagem = this.imagemRepository.create({
      ...restoDoDto,
      variacao,
    });

    return this.imagemRepository.save(imagem);
  }

  findAll(): Promise<ImagemProduto[]> {
    return this.imagemRepository.find({ relations: ['variacao'] });
  }

  async findOne(id: number): Promise<ImagemProduto> {
    const imagem = await this.imagemRepository.findOne({ 
      where: { id },
      relations: ['variacao'],
    });
    if (!imagem) {
      throw new NotFoundException(`Imagem com o ID "${id}" não encontrada.`);
    }
    return imagem;
  }

  async update(id: number, updateDto: UpdateImagemProdutoDto): Promise<ImagemProduto> {
    const { variacaoId, ...restoDoDto } = updateDto;
    
    const imagem = await this.imagemRepository.preload({
      id: id,
      ...restoDoDto,
    });

    if (!imagem) {
      throw new NotFoundException(`Imagem com o ID "${id}" não encontrada.`);
    }

    if (variacaoId) {
      const variacao = await this.variacaoProdutoService.findOne(variacaoId);
      imagem.variacao = variacao;
    }

    return this.imagemRepository.save(imagem);
  }

  async remove(id: number): Promise<void> {
    const result = await this.imagemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Imagem com o ID "${id}" não encontrada.`);
    }
  }
}
