import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Pelicula } from '../../pelicula/entities/pelicula.entity';

@Entity()
export class Genero {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToMany(() => Pelicula, pelicula => pelicula.generos)
  peliculas: Pelicula[];

}
