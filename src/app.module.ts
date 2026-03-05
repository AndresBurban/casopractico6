import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DirectorModule } from './director/director.module';
import { GeneroModule } from './genero/genero.module';
import { PerfilModule } from './perfil/perfil.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [DirectorModule, GeneroModule, PerfilModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
