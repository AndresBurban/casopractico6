
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Perfil } from '../../perfil/entities/perfil.entity';
import { Pelicula } from '../../pelicula/entities/pelicula.entity';

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

  @ManyToMany(() => Pelicula, (pelicula) => pelicula.usuariosFavoritos)
  peliculasFavoritas: Pelicula[];

}