import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pelicula } from '../../pelicula/entities/pelicula.entity';

@Entity()
export class Genero {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Pelicula, (pelicula) => pelicula.genero)
  peliculas: Pelicula[];

}
