import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Director } from './entities/director.entity';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Injectable()
export class DirectorService {

  constructor(
    @InjectRepository(Director)
    private directorRepository: Repository<Director>,
  ) {}

  async create(createDirectorDto: CreateDirectorDto): Promise<Director> {
    const director = this.directorRepository.create(createDirectorDto);
    return await this.directorRepository.save(director);
  }

  async findAll(): Promise<Director[]> {
    return await this.directorRepository.find({
      relations: ['peliculas'],
    });
  }

  async findOne(id: number): Promise<Director> {
    const director = await this.directorRepository.findOne({
      where: { id },
      relations: ['peliculas'],
    });

    if (!director) {
      throw new NotFoundException(`Director con ID ${id} no encontrado`);
    }

    return director;
  }

  async update(id: number, updateDirectorDto: UpdateDirectorDto): Promise<Director> {
    const director = await this.findOne(id);

    Object.assign(director, updateDirectorDto);

    return await this.directorRepository.save(director);
  }

  async remove(id: number): Promise<void> {
    const director = await this.findOne(id);
    await this.directorRepository.remove(director);
  }
}