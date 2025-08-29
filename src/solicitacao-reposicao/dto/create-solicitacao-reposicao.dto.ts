import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateSolicitacaoReposicaoDto {
  @ApiProperty({ description: 'ID da Variação de Produto que precisa de reposição', example: 1 })
  @IsInt()
  @IsPositive()
  variacaoId: number;

  @ApiProperty({ description: 'Quantidade de itens a serem produzidos', example: 10 })
  @IsInt()
  @IsPositive()
  quantidade_solicitada: number;

  @ApiProperty({ description: 'Indica se a solicitação já nasce concluída', example: false, required: false })
  @IsOptional()
  @IsBoolean()
  concluido?: boolean;

  @ApiProperty({ description: 'Observações adicionais', example: 'Produção urgente para o pedido XYZ.', required: false })
  @IsOptional()
  @IsString()
  observacoes?: string;
}
