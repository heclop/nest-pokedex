import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { cpSync } from 'fs';
import { AxiosAdpater } from 'src/common/adapters/axios.adpater';


@Injectable()
export class SeedService {

  createPokemonDto: CreatePokemonDto;


  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdpater,
    ){}

  async executeSeed() {


    await this.pokemonService.removeAll();


    const  data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
    
    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.forEach(({ name, url }) => {

      const segments = url.split('/');
      const no = +segments[ segments.length - 2 ];

      pokemonToInsert.push({ name, no});

      this.createPokemonDto = {
        name,
        no
      };

      // this.pokemonService.create( this.createPokemonDto );

      // console.log({name, no});

    });

    // console.log(pokemonToInsert)

    await this.pokemonService.createAll( pokemonToInsert );

    return data.results;
  }

}
