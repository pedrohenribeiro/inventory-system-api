import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column('text', { nullable: true })
  descricao: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  preco: number;

  @Column('int', { nullable: false })
  quantidade_em_estoque: number;
}