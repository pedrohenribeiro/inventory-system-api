import { PartialType } from '@nestjs/swagger';
import { CreateProdutoDto } from './create-produto.dto';
import { IsString, IsNumber, IsPositive, IsOptional, MinLength, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProdutoDto extends PartialType(CreateProdutoDto) {
    @ApiProperty({
        description: 'O nome do produto',
        example: 'Monitor Gamer Ultrawide 34"',
        required: false,
    })
    @IsOptional()
    @IsString()
    @MinLength(3)
    nome?: string;

    @ApiProperty({
        description: 'Uma descrição detalhada do produto',
        example: 'Monitor com resolução QHD, 144Hz de taxa de atualização e 1ms de resposta.',
        required: false,
    })
    @IsOptional()
    @IsString()
    descricao?: string;

    @ApiProperty({
        description: 'O preço de venda do produto',
        example: 2499.99,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    preco?: number;

    @ApiProperty({
        description: 'A quantidade de unidades do produto em estoque',
        example: 15,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @IsInt()
    quantidade_em_estoque?: number;
}
