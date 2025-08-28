import { Module } from '@nestjs/common';
import { TiposService } from './tipos.service';
import { TiposController } from './tipos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tipo } from './entities/tipo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tipo])], // Adicione esta linha
  controllers: [TiposController],
  providers: [TiposService],
  exports: [TiposService], // Garanta que o serviço está sendo exportado
})
export class TiposModule {}
