import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateTipoDto {
  @ApiProperty({
    description: 'O nome do tipo de produto',
    example: 'Blusa',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nome: string;
}