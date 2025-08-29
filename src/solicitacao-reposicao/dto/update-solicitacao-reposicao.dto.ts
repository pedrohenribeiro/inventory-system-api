import { PartialType } from '@nestjs/swagger';
import { CreateSolicitacaoReposicaoDto } from './create-solicitacao-reposicao.dto';

export class UpdateSolicitacaoReposicaoDto extends PartialType(CreateSolicitacaoReposicaoDto) {}
