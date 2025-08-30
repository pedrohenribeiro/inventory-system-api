import { PartialType } from '@nestjs/swagger';
import { CreateImagemProdutoDto } from './create-imagem-produto.dto';

export class UpdateImagemProdutoDto extends PartialType(CreateImagemProdutoDto) {}