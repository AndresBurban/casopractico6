import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';

@Controller('perfiles')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Post()
  create(@Body() createPerfilDto: CreatePerfilDto) {
    return this.perfilService.create(createPerfilDto);
  }

  @Get()
  findAll() {
    return this.perfilService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.perfilService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePerfilDto: UpdatePerfilDto,
  ) {
    return this.perfilService.update(id, updatePerfilDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.perfilService.remove(id);
  }
}