import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto';
import { Pelicula } from './entities/pelicula.entity';
import { Genero } from '../genero/entities/genero.entity';

@Injectable()
export class PeliculaService {
  constructor(
    @InjectRepository(Pelicula)
    private readonly peliculaRepository: Repository<Pelicula>,
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
  ) {}

  async create(createPeliculaDto: CreatePeliculaDto): Promise<Pelicula> {
    const { generoIds, ...peliculaData } = createPeliculaDto;
    const pelicula = this.peliculaRepository.create(peliculaData);

    if (generoIds && generoIds.length > 0) {
      pelicula.generos = await this.generoRepository.findBy({ id: In(generoIds) });
    }

    return await this.peliculaRepository.save(pelicula);
  }

  async findAll(): Promise<Pelicula[]> {
    return await this.peliculaRepository.find({ relations: ['generos'] });
  }

  async findOne(id: number): Promise<Pelicula> {
    const pelicula = await this.peliculaRepository.findOne({
      where: { id },
      relations: ['generos'],
    });
    if (!pelicula) {
      throw new NotFoundException(`Película con ID ${id} no encontrada`);
    }
    return pelicula;
  }

  async update(id: number, updatePeliculaDto: UpdatePeliculaDto): Promise<Pelicula> {
    const { generoIds, ...peliculaData } = updatePeliculaDto;
    const pelicula = await this.findOne(id);
    this.peliculaRepository.merge(pelicula, peliculaData);

    if (generoIds) {
      pelicula.generos = await this.generoRepository.findBy({ id: In(generoIds) });
    }

    return await this.peliculaRepository.save(pelicula);
  }

  async remove(id: number): Promise<void> {
    const pelicula = await this.findOne(id);
    await this.peliculaRepository.remove(pelicula);
  }
}
