import { PartialType } from '@nestjs/swagger';
import { CreateMovimentacaoEstoqueDto } from './create-movimentacao-estoque.dto';

export class UpdateMovimentacaoEstoqueDto extends PartialType(
  CreateMovimentacaoEstoqueDto,
) {}
