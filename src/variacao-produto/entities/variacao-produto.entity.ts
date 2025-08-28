import { ApiProperty } from '@nestjs/swagger';
import { Produto } from '../../produtos/entities/produto.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'variacoes_produto' })
export class VariacaoProduto {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @ApiProperty({ description: 'Tamanho da peça (ex: P, M, G, 42)', example: 'M' })
  @Column({ type: 'varchar', length: 10, nullable: true })
  tamanho: string;
  
  @ApiProperty({ description: 'Cor da peça', example: 'Azul Royal' })
  @Column({ type: 'varchar', length: 50, nullable: true })
  cor: string;

  @ApiProperty({ description: 'Código de barras único para a variação (SKU)', example: 'VTL-M-AZR-001' })
  @Column({ type: 'varchar', length: 255, unique: true })
  codigo_barras: string;

  @ApiProperty({ description: 'Quantidade atual de itens em estoque' })
  @Column({ type: 'integer', default: 0 })
  quantidade_em_estoque: number;

  @ApiProperty({ description: 'Estoque mínimo para acionar reposição' })
  @Column({ type: 'integer', default: 0 })
  quantidade_minima: number;

  @ApiProperty({ description: 'Quantidade ideal a ser mantida em estoque' })
  @Column({ type: 'integer', default: 0 })
  quantidade_ideal: number;

  @ApiProperty({ type: () => Produto })
  @ManyToOne(() => Produto, { eager: true })
  @JoinColumn({ name: 'produto_id' })
  produto: Produto;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}