import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsNotEmpty,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateProdutoDto {
  @ApiProperty({
    description: 'O nome do produto',
    example: 'Vestido Longo de Festa',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nome: string;

  @ApiProperty({
    description: 'Uma descrição detalhada do produto',
    example: 'Vestido longo de seda, ideal para casamentos e formaturas.',
    required: false,
  })
  @IsString()
  @IsOptional()
  descricao: string;

  @ApiProperty({
    description: 'O ID do tipo ao qual o produto pertence',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  tipoId: number;

  @ApiProperty({
    description: 'O material principal do produto',
    example: 'Seda',
    required: false,
  })
  @IsString()
  @IsOptional()
  material: string;
}
