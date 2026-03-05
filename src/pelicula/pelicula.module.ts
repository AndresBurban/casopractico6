import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pelicula } from './entities/pelicula.entity';
import { PeliculaService } from './pelicula.service';
import { PeliculaController } from './pelicula.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pelicula])],
  controllers: [PeliculaController],
  providers: [PeliculaService],
  exports: [PeliculaService],
})
export class PeliculaModule {}