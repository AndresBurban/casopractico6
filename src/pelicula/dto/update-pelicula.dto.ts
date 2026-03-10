import { PartialType } from '@nestjs/mapped-types';
import { CreatePeliculaDto } from './create-pelicula.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdatePeliculaDto extends PartialType(CreatePeliculaDto) {
    @IsOptional()
    @IsInt()
    generoId?: number;

    @IsOptional()
    @IsInt()
    directorId?: number;
}
