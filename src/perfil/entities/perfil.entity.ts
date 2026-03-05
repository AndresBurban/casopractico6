import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity()
export class Perfil {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Usuario, usuario => usuario.perfiles)
  usuario: Usuario;

}