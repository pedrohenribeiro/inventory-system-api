import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateImagemProdutoDto {
  @ApiProperty({
    description: 'ID da Variação de Produto à qual esta imagem pertence',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  variacaoId: number;

  @ApiProperty({
    description: 'URL ou caminho para o arquivo da imagem',
    example: '/uploads/vestido-azul-m-frente.jpg',
  })
  @IsString()
  @IsNotEmpty()
  caminho_imagem: string;

  @ApiProperty({
    description: 'Texto alternativo para acessibilidade (SEO)',
    example: 'Vista frontal do vestido longo azul tamanho M',
    required: false,
  })
  @IsOptional()
  @IsString()
  texto_alternativo?: string;

  @ApiProperty({
    description: 'Ordem em que a imagem deve ser exibida',
    example: 1,
    default: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  ordem_exibicao?: number;
}
