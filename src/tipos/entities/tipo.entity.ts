import { ApiProperty } from '@nestjs/swagger';
import { Produto } from '../../produtos/entities/produto.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'tipos' })
export class Tipo {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @ApiProperty({ example: 'Vestido' })
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  nome: string;

  @OneToMany(() => Produto, (produto) => produto.tipo)
  produtos: Produto[];
}