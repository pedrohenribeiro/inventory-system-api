import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ImagemProdutoService } from './imagem-produto.service';
import { CreateImagemProdutoDto } from './dto/create-imagem-produto.dto';
import { UpdateImagemProdutoDto } from './dto/update-imagem-produto.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ImagemProduto } from './entities/imagem-produto.entity';

@ApiTags('Imagens de Produto')
@Controller('imagem-produto')
export class ImagemProdutoController {
  constructor(private readonly imagemProdutoService: ImagemProdutoService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar uma nova imagem a uma variação de produto' })
  @ApiResponse({ status: 201, description: 'A imagem foi adicionada com sucesso.', type: ImagemProduto })
  create(@Body() createImagemProdutoDto: CreateImagemProdutoDto) {
    return this.imagemProdutoService.create(createImagemProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as imagens' })
  @ApiResponse({ status: 200, description: 'Lista de imagens retornada com sucesso.', type: [ImagemProduto] })
  findAll() {
    return this.imagemProdutoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma imagem pelo ID' })
  @ApiResponse({ status: 200, description: 'Imagem retornada com sucesso.', type: ImagemProduto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.imagemProdutoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma imagem pelo ID' })
  @ApiResponse({ status: 200, description: 'Imagem atualizada com sucesso.', type: ImagemProduto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateImagemProdutoDto: UpdateImagemProdutoDto) {
    return this.imagemProdutoService.update(id, updateImagemProdutoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover uma imagem pelo ID' })
  @ApiResponse({ status: 204, description: 'Imagem removida com sucesso.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.imagemProdutoService.remove(id);
  }
}
