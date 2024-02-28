import { Module } from '@nestjs/common';
import { PokemonModule } from './pokemon/pokemon.module';
import { ServeStaticModule, serveStaticProviders } from '@nestjs/serve-static';
import { join } from 'path';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
    rootPath : join(__dirname,'..','public'),
  }),
  MongooseModule.forRoot(process.env.MONGODB)
  ,PokemonModule, CommonModule, SeedModule,
],
})
export class AppModule { 
  constructor(){
  }
}
