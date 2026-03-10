import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pelicula } from '../../pelicula/entities/pelicula.entity';

@Entity()
export class Director {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @OneToMany(() => Pelicula, (pelicula) => pelicula.director)
    peliculas: Pelicula[];
}
