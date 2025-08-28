import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Tipo } from '../../tipos/entities/tipo.entity';

@Entity({ name: 'produtos' })
export class Produto {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  material: string;

  @ManyToOne(() => Tipo, (tipo) => tipo.produtos, { eager: true })
  @JoinColumn({ name: 'tipo_id' })
  tipo: Tipo;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
