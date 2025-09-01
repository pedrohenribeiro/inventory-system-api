import { PartialType } from '@nestjs/swagger';
import { CreateVariacaoProdutoDto } from './create-variacao-produto.dto';

export class UpdateVariacaoProdutoDto extends PartialType(CreateVariacaoProdutoDto) {}