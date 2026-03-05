
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUsuarioDto {

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  tipoSuscripcion: string;

}