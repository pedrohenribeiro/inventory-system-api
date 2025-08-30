import { ApiProperty } from '@nestjs/swagger';
import { VariacaoProduto } from '../../variacao-produto/entities/variacao-produto.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'imagens_produto' })
export class ImagemProduto {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @ApiProperty({
    description: 'URL ou caminho para o arquivo da imagem',
    example: '/uploads/vestido-azul-m-frente.jpg',
  })
  @Column({ type: 'varchar', length: 1024 })
  caminho_imagem: string;

  @ApiProperty({
    description: 'Texto alternativo para acessibilidade (SEO)',
    example: 'Vista frontal do vestido longo azul tamanho M',
    required: false,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  texto_alternativo: string;

  @ApiProperty({
    description: 'Ordem em que a imagem deve ser exibida',
    example: 1,
    default: 0,
  })
  @Column({ type: 'smallint', default: 0 })
  ordem_exibicao: number;

  @ManyToOne(() => VariacaoProduto, (variacao) => variacao.imagens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'variacao_id' })
  variacao: VariacaoProduto;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;
}
