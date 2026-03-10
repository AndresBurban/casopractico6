import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto';
import { Pelicula } from './entities/pelicula.entity';
import { Genero } from '../genero/entities/genero.entity';
import { Director } from '../director/entities/director.entity';

@Injectable()
export class PeliculaService {
  constructor(
    @InjectRepository(Pelicula)
    private readonly peliculaRepository: Repository<Pelicula>,
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
  ) { }

  async create(createPeliculaDto: CreatePeliculaDto): Promise<Pelicula> {
    const { generoId, directorId, ...peliculaData } = createPeliculaDto;

    const genero = await this.generoRepository.findOneBy({ id: generoId });
    if (!genero) throw new NotFoundException(`Género con ID ${generoId} no encontrado`);

    const director = await this.directorRepository.findOneBy({ id: directorId });
    if (!director) throw new NotFoundException(`Director con ID ${directorId} no encontrado`);

    const pelicula = this.peliculaRepository.create({
      ...peliculaData,
      genero,
      director,
    });

    return await this.peliculaRepository.save(pelicula);
  }

  async findAll(): Promise<Pelicula[]> {
    return await this.peliculaRepository.find({
      relations: ['genero', 'director', 'usuariosFavoritos']
    });
  }

  async findOne(id: number): Promise<Pelicula> {
    const pelicula = await this.peliculaRepository.findOne({
      where: { id },
      relations: ['genero', 'director', 'usuariosFavoritos'],
    });
    if (!pelicula) {
      throw new NotFoundException(`Película con ID ${id} no encontrada`);
    }
    return pelicula;
  }

  async update(id: number, updatePeliculaDto: UpdatePeliculaDto): Promise<Pelicula> {
    const { generoId, directorId, ...peliculaData } = updatePeliculaDto;
    const pelicula = await this.findOne(id);

    this.peliculaRepository.merge(pelicula, peliculaData);

    if (generoId) {
      const genero = await this.generoRepository.findOneBy({ id: generoId });
      if (!genero) throw new NotFoundException(`Género con ID ${generoId} no encontrado`);
      pelicula.genero = genero;
    }

    if (directorId) {
      const director = await this.directorRepository.findOneBy({ id: directorId });
      if (!director) throw new NotFoundException(`Director con ID ${directorId} no encontrado`);
      pelicula.director = director;
    }

    return await this.peliculaRepository.save(pelicula);
  }

  async remove(id: number): Promise<void> {
    const pelicula = await this.findOne(id);
    await this.peliculaRepository.remove(pelicula);
  }
}
