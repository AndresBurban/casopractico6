import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { Genero } from './entities/genero.entity';

@Injectable()
export class GeneroService {
  constructor(
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
  ) {}

  async create(createGeneroDto: CreateGeneroDto): Promise<Genero> {
    const genero = this.generoRepository.create(createGeneroDto);
    return await this.generoRepository.save(genero);
  }

  async findAll(): Promise<Genero[]> {
    return await this.generoRepository.find({ relations: ['peliculas'] });
  }

  async findOne(id: number): Promise<Genero> {
    const genero = await this.generoRepository.findOne({
      where: { id },
      relations: ['peliculas'],
    });
    if (!genero) {
      throw new NotFoundException(`Género con ID ${id} no encontrado`);
    }
    return genero;
  }

  async update(id: number, updateGeneroDto: UpdateGeneroDto): Promise<Genero> {
    const genero = await this.findOne(id);
    this.generoRepository.merge(genero, updateGeneroDto);
    return await this.generoRepository.save(genero);
  }

  async remove(id: number): Promise<void> {
    const genero = await this.findOne(id);
    await this.generoRepository.remove(genero);
  }
}
