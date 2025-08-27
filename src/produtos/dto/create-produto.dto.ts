import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsNotEmpty, MinLength, IsOptional, IsInt } from 'class-validator';

export class CreateProdutoDto {
  @ApiProperty({
    description: 'O nome do produto',
    example: 'Monitor Gamer Ultrawide 34"',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nome: string;

  @ApiProperty({
    description: 'Uma descrição detalhada do produto',
    example: 'Monitor com resolução QHD, 144Hz de taxa de atualização e 1ms de resposta.',
    required: false,
  })
  @IsOptional()
  @IsString()
  descricao: string;

  @ApiProperty({
    description: 'O preço de venda do produto',
    example: 2499.99,
  })
  @IsNumber()
  @IsPositive()
  preco: number;

  @ApiProperty({
    description: 'A quantidade de unidades do produto em estoque',
    example: 15,
  })
  @IsNumber()
  @IsPositive()
  @IsInt()
  quantidade_em_estoque: number;
}