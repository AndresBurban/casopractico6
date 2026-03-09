

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Perfil } from '../../perfil/entities/perfil.entity';

@Entity()
export class Usuario {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  tipoSuscripcion: string;

  @OneToMany(() => Perfil, perfil => perfil.usuario)
  perfiles: Perfil[];

}