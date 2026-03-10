import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreatePeliculaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsInt()
  @IsNotEmpty()
  duracion: number;

  @IsString()
  @IsNotEmpty()
  sinopsis: string;

  @IsInt()
  @IsNotEmpty()
  anioEstreno: number;

  @IsInt()
  @IsNotEmpty()
  directorId: number;

  @IsInt()
  @IsNotEmpty()
  generoId: number;
}
