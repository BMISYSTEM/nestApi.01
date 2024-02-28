import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>
  ){}


  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      if(error.code === 11000 ) {
        throw new BadRequestException('El id del pokemon ya existe en la base de datos')
       }
      throw new InternalServerErrorException('Error inesperado del lado del servidor')
    }
  }

  findAll(paginationDto:PaginationDto) {
    const {limit = 10 , offset = 0} = paginationDto;
    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
  }

  async findOne(id: string) {
    let Pokemon:Pokemon;
    // consultar si el id es numerico 
    if (!isNaN(+id)){
      Pokemon = await this.pokemonModel.findOne({no:id});
    }
    // verificacion de mongo
    if(!Pokemon && isValidObjectId(id)) {
      Pokemon = await this.pokemonModel.findById(id);
    }
    //verificacion de nombre 
    if(!Pokemon){
      Pokemon = await this.pokemonModel.findOne({name:id.toLocaleLowerCase()});
    } 

    if (!Pokemon) throw new NotFoundException('No se encontro el no del pokemon');

    return Pokemon
    
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    // validar si existe en la bd 
    const pokemon = await this.findOne(id);
    try {
      if (updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase(); //se pasa a minuscula para grabar en bd
      await pokemon.updateOne(updatePokemonDto,{new:true});
      return 'Se actualizo de forma correcta';
    } catch (error) {
      if(error.code === 11000) throw new BadRequestException('El nombre que desea actualizar ya existe con otro id');
      throw new InternalServerErrorException('Error inesperado en el servidor ');
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();
    const result = await this.pokemonModel.findByIdAndDelete(id);
    if (!result)
    {
      throw new BadRequestException('El id no existe en la base de datos ');
    }
    return 'Se elimino de forma correcta';
  }
}
