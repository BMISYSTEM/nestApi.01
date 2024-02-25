import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreatePokemonDto {
    @IsNumber({},{message:' el campo no No es un valor numerico'})
    @IsPositive({message:'El campo no no es un valor positivo'})
    no:number;
    @IsString({message:'El nombre no es un string'})
    @MinLength(1,{message:'El nombre es obligatorio'})
    name:string;
}
