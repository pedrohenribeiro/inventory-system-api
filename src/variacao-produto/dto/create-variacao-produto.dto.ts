import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateVariacaoProdutoDto {
  @ApiProperty({ description: 'ID do produto ao qual esta variação pertence', example: 1 })
  @IsInt()
  @IsPositive()
  produtoId: number;

  @ApiProperty({ description: 'Tamanho da peça (ex: P, M, G, 42)', example: 'M', required: false })
  @IsOptional()
  @IsString()
  tamanho?: string;
  
  @ApiProperty({ description: 'Cor da peça', example: 'Azul Royal', required: false })
  @IsOptional()
  @IsString()
  cor?: string;

  @ApiProperty({ description: 'Código de barras único para a variação (SKU)', example: 'VTL-M-AZR-001' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  codigo_barras: string;

  @ApiProperty({ description: 'Quantidade inicial em estoque', example: 10, default: 0, required: false })
  @IsOptional()
  @IsInt()
  quantidade_em_estoque?: number;

  @ApiProperty({ description: 'Estoque mínimo para acionar reposição', example: 5, default: 0, required: false })
  @IsOptional()
  @IsInt()
  quantidade_minima?: number;

  @ApiProperty({ description: 'Quantidade ideal a ser mantida em estoque', example: 20, default: 0, required: false })
  @IsOptional()
  @IsInt()
  quantidade_ideal?: number;
}