import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tipo } from './entities/tipo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TiposService {
  constructor(
    @InjectRepository(Tipo)
    private readonly tipoRepository: Repository<Tipo>,
  ) {}

  create(createTipoDto: CreateTipoDto): Promise<Tipo> {
    const tipo = this.tipoRepository.create(createTipoDto);
    return this.tipoRepository.save(tipo);
  }

  findAll(): Promise<Tipo[]> {
    return this.tipoRepository.find();
  }

  async findOne(id: number): Promise<Tipo> {
    const tipo = await this.tipoRepository.findOneBy({ id });
    if (!tipo) {
      throw new NotFoundException(`Tipo com o ID "${id}" não encontrado.`);
    }
    return tipo;
  }

  async update(id: number, updateTipoDto: UpdateTipoDto): Promise<Tipo> {
    const tipo = await this.tipoRepository.preload({
      id: id,
      ...updateTipoDto,
    });
    if (!tipo) {
      throw new NotFoundException(`Tipo com o ID "${id}" não encontrado.`);
    }
    return this.tipoRepository.save(tipo);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tipoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tipo com o ID "${id}" não encontrado.`);
    }
  }
}
