import { Injectable } from '@nestjs/common';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto';

@Injectable()
export class PeliculaService {
  create(createPeliculaDto: CreatePeliculaDto) {
    return 'This action adds a new pelicula';
  }

  findAll() {
    return `This action returns all pelicula`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pelicula`;
  }

  update(id: number, updatePeliculaDto: UpdatePeliculaDto) {
    return `This action updates a #${id} pelicula`;
  }

  remove(id: number) {
    return `This action removes a #${id} pelicula`;
  }
}
