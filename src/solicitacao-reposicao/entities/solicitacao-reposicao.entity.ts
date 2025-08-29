import { ApiProperty } from '@nestjs/swagger';
import { VariacaoProduto } from '../../variacao-produto/entities/variacao-produto.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'solicitacoes_reposicao' })
export class SolicitacaoReposicao {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @ApiProperty({ description: 'Quantidade de itens solicitados para produção' })
  @Column({ type: 'integer' })
  quantidade_solicitada: number;

  @ApiProperty({ description: 'Indica se a solicitação de produção já foi concluída' })
  @Column({ type: 'boolean', default: false })
  concluido: boolean;

  @ApiProperty({ description: 'Observações adicionais sobre o pedido de produção', required: false })
  @Column({ type: 'text', nullable: true })
  observacoes: string;

  @ApiProperty({ type: () => VariacaoProduto })
  @ManyToOne(() => VariacaoProduto, { eager: true }) // eager: true carrega a variação automaticamente
  @JoinColumn({ name: 'variacao_id' })
  variacao: VariacaoProduto;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
