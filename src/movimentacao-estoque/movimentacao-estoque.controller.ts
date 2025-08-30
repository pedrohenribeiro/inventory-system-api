import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { MovimentacaoEstoqueService } from './movimentacao-estoque.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MovimentacaoEstoque } from './entities/movimentacao-estoque.entity';

@ApiTags('Movimentações de Estoque')
@Controller('movimentacao-estoque')
export class MovimentacaoEstoqueController {
  constructor(
    private readonly movimentacaoEstoqueService: MovimentacaoEstoqueService,
  ) {}

  @Get('variacao/:variacaoId')
  @ApiOperation({
    summary: 'Listar o histórico de movimentações de uma variação de produto',
  })
  @ApiResponse({
    status: 200,
    description: 'Histórico de movimentações retornado com sucesso.',
    type: [MovimentacaoEstoque],
  })
  @ApiResponse({ status: 404, description: 'Variação não encontrada.' })
  findByVariacaoId(@Param('variacaoId', ParseIntPipe) variacaoId: number) {
    return this.movimentacaoEstoqueService.findByVariacaoId(variacaoId);
  }
}
