
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreatePerfilDto {

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  edad: number;

  @IsString()
  idioma: string;

}