
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { VariacaoProdutoService } from './variacao-produto.service';
import { CreateVariacaoProdutoDto } from './dto/create-variacao-produto.dto';
import { UpdateVariacaoProdutoDto } from './dto/update-variacao-produto.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VariacaoProduto } from './entities/variacao-produto.entity';

@ApiTags('Variações de Produto')
@Controller('variacoes-produto')
export class VariacaoProdutoController {
  constructor(private readonly variacaoProdutoService: VariacaoProdutoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova variação de produto (SKU)' })
  @ApiResponse({ status: 201, description: 'A variação foi criada com sucesso.', type: VariacaoProduto })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos.' })
  @ApiResponse({ status: 404, description: 'Produto base não encontrado.' })
  create(@Body() createVariacaoProdutoDto: CreateVariacaoProdutoDto) {
    return this.variacaoProdutoService.create(createVariacaoProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as variações de produto' })
  @ApiResponse({ status: 200, description: 'Lista de variações retornada com sucesso.', type: [VariacaoProduto] })
  findAll() {
    return this.variacaoProdutoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma variação de produto pelo ID' })
  @ApiResponse({ status: 200, description: 'Variação retornada com sucesso.', type: VariacaoProduto })
  @ApiResponse({ status: 404, description: 'Variação não encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.variacaoProdutoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma variação de produto pelo ID' })
  @ApiResponse({ status: 200, description: 'Variação atualizada com sucesso.', type: VariacaoProduto })
  @ApiResponse({ status: 404, description: 'Variação ou Produto base não encontrado.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateVariacaoProdutoDto: UpdateVariacaoProdutoDto) {
    return this.variacaoProdutoService.update(id, updateVariacaoProdutoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover uma variação de produto pelo ID' })
  @ApiResponse({ status: 204, description: 'Variação removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Variação não encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.variacaoProdutoService.remove(id);
  }
}