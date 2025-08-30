import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { SolicitacaoReposicaoService } from './solicitacao-reposicao.service';
import { CreateSolicitacaoReposicaoDto } from './dto/create-solicitacao-reposicao.dto';
import { UpdateSolicitacaoReposicaoDto } from './dto/update-solicitacao-reposicao.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SolicitacaoReposicao } from './entities/solicitacao-reposicao.entity';

@ApiTags('Solicitações de Reposição')
@Controller('solicitacao-reposicao')
export class SolicitacaoReposicaoController {
  constructor(private readonly solicitacaoReposicaoService: SolicitacaoReposicaoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova solicitação de reposição' })
  @ApiResponse({ status: 201, description: 'A solicitação foi criada com sucesso.', type: SolicitacaoReposicao })
  create(@Body() createSolicitacaoReposicaoDto: CreateSolicitacaoReposicaoDto) {
    return this.solicitacaoReposicaoService.create(createSolicitacaoReposicaoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as solicitações de reposição' })
  @ApiResponse({ status: 200, description: 'Lista de solicitações retornada com sucesso.', type: [SolicitacaoReposicao] })
  findAll() {
    return this.solicitacaoReposicaoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma solicitação pelo ID' })
  @ApiResponse({ status: 200, description: 'Solicitação retornada com sucesso.', type: SolicitacaoReposicao })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.solicitacaoReposicaoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma solicitação pelo ID' })
  @ApiResponse({ status: 200, description: 'Solicitação atualizada com sucesso.', type: SolicitacaoReposicao })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSolicitacaoReposicaoDto: UpdateSolicitacaoReposicaoDto) {
    return this.solicitacaoReposicaoService.update(id, updateSolicitacaoReposicaoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover uma solicitação pelo ID' })
  @ApiResponse({ status: 204, description: 'Solicitação removida com sucesso.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.solicitacaoReposicaoService.remove(id);
  }
}
