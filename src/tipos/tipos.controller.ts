import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TiposService } from './tipos.service';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Tipo } from './entities/tipo.entity';

@ApiTags('tipos')
@Controller('tipos')
export class TiposController {
  constructor(private readonly tiposService: TiposService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo tipo de produto' })
  @ApiResponse({ status: 201, description: 'O tipo foi criado com sucesso.', type: Tipo })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos.' })
  create(@Body() createTipoDto: CreateTipoDto) {
    return this.tiposService.create(createTipoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os tipos de produto' })
  @ApiResponse({ status: 200, description: 'Lista de tipos retornada com sucesso.', type: [Tipo] })
  findAll() {
    return this.tiposService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um tipo de produto pelo ID' })
  @ApiResponse({ status: 200, description: 'Tipo retornado com sucesso.', type: Tipo })
  @ApiResponse({ status: 404, description: 'Tipo não encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tiposService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um tipo de produto pelo ID' })
  @ApiResponse({ status: 200, description: 'Tipo atualizado com sucesso.', type: Tipo })
  @ApiResponse({ status: 404, description: 'Tipo não encontrado.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTipoDto: UpdateTipoDto) {
    return this.tiposService.update(id, updateTipoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um tipo de produto pelo ID' })
  @ApiResponse({ status: 204, description: 'Tipo removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Tipo não encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tiposService.remove(id);
  }
}
