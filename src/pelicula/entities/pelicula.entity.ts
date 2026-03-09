import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Genero } from '../../genero/entities/genero.entity';

@Entity()
export class Pelicula {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  duracion: number;

  @Column()
  sinopsis: string;

  @ManyToMany(() => Genero, genero => genero.peliculas)
  @JoinTable()
  generos: Genero[];

}
