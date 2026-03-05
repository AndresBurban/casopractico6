import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Perfil } from './entities/perfil.entity';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';

@Injectable()
export class PerfilService {

  constructor(
    @InjectRepository(Perfil)
    private perfilRepository: Repository<Perfil>,
  ) {}

  // Crear perfil
  async create(createPerfilDto: CreatePerfilDto): Promise<Perfil> {
    const perfil = this.perfilRepository.create(createPerfilDto);
    return await this.perfilRepository.save(perfil);
  }

  // Listar perfiles
  async findAll(): Promise<Perfil[]> {
    return await this.perfilRepository.find({
      relations: ['usuario'],
    });
  }

  // Buscar perfil por ID
  async findOne(id: number): Promise<Perfil> {
    const perfil = await this.perfilRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });

    if (!perfil) {
      throw new NotFoundException(`Perfil con id ${id} no encontrado`);
    }

    return perfil;
  }

  // Actualizar perfil
  async update(id: number, updatePerfilDto: UpdatePerfilDto): Promise<Perfil> {
    const perfil = await this.findOne(id);

    Object.assign(perfil, updatePerfilDto);

    return await this.perfilRepository.save(perfil);
  }

  // Eliminar perfil
  async remove(id: number) {
    const perfil = await this.findOne(id);
    return await this.perfilRepository.remove(perfil);
  }
}