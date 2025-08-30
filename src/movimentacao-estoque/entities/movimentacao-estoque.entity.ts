import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VariacaoProduto } from '../../variacao-produto/entities/variacao-produto.entity';
import { ApiProperty } from '@nestjs/swagger';

// Enum para os tipos de transação, garantindo consistência
export enum TipoTransacao {
  PRODUCAO_FINALIZADA = 'producao_finalizada',
  VENDA = 'venda',
  DEVOLUCAO = 'devolucao',
  AJUSTE_ENTRADA = 'ajuste_entrada',
  AJUSTE_SAIDA = 'ajuste_saida',
}

@Entity({ name: 'movimentacoes_estoque' })
export class MovimentacaoEstoque {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({
    type: 'enum',
    enum: TipoTransacao,
    nullable: false,
  })
  tipo_transacao: TipoTransacao;

  @Column({ type: 'integer', nullable: false })
  alteracao_quantidade: number; // Positivo para entradas, negativo para saídas

  @Column({ type: 'text', nullable: true })
  observacoes: string;

  @ManyToOne(() => VariacaoProduto, (variacao) => variacao.movimentacoes)
  @JoinColumn({ name: 'variacao_id' })
  variacao: VariacaoProduto;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  criadoEm: Date;
}
