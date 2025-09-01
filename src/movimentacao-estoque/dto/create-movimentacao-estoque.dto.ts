import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TipoTransacao } from '../entities/movimentacao-estoque.entity';

export class CreateMovimentacaoEstoqueDto {
  @ApiProperty({ description: 'ID da Variação de Produto a ser movimentada' })
  @IsInt()
  @IsNotEmpty()
  variacaoId: number;

  @ApiProperty({ enum: TipoTransacao, description: 'O tipo da transação' })
  @IsEnum(TipoTransacao)
  @IsNotEmpty()
  tipo_transacao: TipoTransacao;

  @ApiProperty({
    description:
      'A quantidade a ser alterada (positiva para entradas, negativa para saídas)',
    example: 5,
  })
  @IsInt()
  @IsNotEmpty()
  alteracao_quantidade: number;

  @ApiProperty({
    description: 'Observações sobre a movimentação',
    required: false,
  })
  @IsString()
  @IsOptional()
  observacoes?: string;
}
