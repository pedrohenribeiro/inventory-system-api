import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolicitacaoReposicaoService } from './solicitacao-reposicao.service';
import { CreateSolicitacaoReposicaoDto } from './dto/create-solicitacao-reposicao.dto';
import { UpdateSolicitacaoReposicaoDto } from './dto/update-solicitacao-reposicao.dto';

@Controller('solicitacao-reposicao')
export class SolicitacaoReposicaoController {
  constructor(private readonly solicitacaoReposicaoService: SolicitacaoReposicaoService) {}

  @Post()
  create(@Body() createSolicitacaoReposicaoDto: CreateSolicitacaoReposicaoDto) {
    return this.solicitacaoReposicaoService.create(createSolicitacaoReposicaoDto);
  }

  @Get()
  findAll() {
    return this.solicitacaoReposicaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitacaoReposicaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSolicitacaoReposicaoDto: UpdateSolicitacaoReposicaoDto) {
    return this.solicitacaoReposicaoService.update(+id, updateSolicitacaoReposicaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitacaoReposicaoService.remove(+id);
  }
}
