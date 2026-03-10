import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pelicula } from './entities/pelicula.entity';
import { PeliculaService } from './pelicula.service';
import { PeliculaController } from './pelicula.controller';
import { Genero } from '../genero/entities/genero.entity';
import { Director } from '../director/entities/director.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pelicula, Genero, Director])],
  controllers: [PeliculaController],
  providers: [PeliculaService],
  exports: [PeliculaService],
})
export class PeliculaModule { }