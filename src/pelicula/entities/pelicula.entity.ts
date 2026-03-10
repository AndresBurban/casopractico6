import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Genero } from '../../genero/entities/genero.entity';
import { Director } from '../../director/entities/director.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

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

  @Column()
  anioEstreno: number;

  @ManyToOne(() => Genero, (genero) => genero.peliculas, { nullable: false })
  genero: Genero;

  @ManyToOne(() => Director, (director) => director.peliculas, { nullable: false })
  director: Director;

  @ManyToMany(() => Usuario, (usuario) => usuario.peliculasFavoritas)
  @JoinTable()
  usuariosFavoritos: Usuario[];

}
