import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosApdater } from 'src/common/adapter/axios.adapter';


@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;
  constructor(
    @InjectModel(Pokemon.name )
    private readonly pokemonModel:Model<Pokemon>,
    private readonly http:AxiosApdater,
  ){}
 async executeSeed(){
  /**Se elimina toda la tabla de pokemons para evitar duplicados al momento de cargar la info */
  await this.pokemonModel.deleteMany({});
  /**Se realizo un provider para implementar axios como patron adaptador */
  const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
  /**se crea un array donde se almacenaran los pokemones*/
  const arrayPokemon = [];
  data.results.forEach( ({name,url})=> {
    const segment = url.split('/');
    const no:number = +segment[6];
    arrayPokemon.push( {name,no})
  })
  /**Ejecutando todo el array*/
  await this.pokemonModel.insertMany(arrayPokemon);
  return data.results;
 }
}
