import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DirectorModule } from './director/director.module';
import { GeneroModule } from './genero/genero.module';
import { PerfilModule } from './perfil/perfil.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'cinestream',
      autoLoadEntities: true,
      synchronize: true,
    }),

    DirectorModule,
    GeneroModule,
    PerfilModule,
    UsuarioModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}