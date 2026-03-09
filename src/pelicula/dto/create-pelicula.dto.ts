import { IsString, IsNotEmpty, IsInt, IsOptional, IsArray } from 'class-validator';

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

  @IsArray()
  @IsOptional()
  generoIds?: number[];
}
