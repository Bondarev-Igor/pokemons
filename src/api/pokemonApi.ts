import axios, { AxiosResponse } from 'axios';
import { PokStateType } from 'bll/pokemonReducer';

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/',
});

export const getPokemons = (): Promise<AxiosResponse<PokStateType>> => {
  const promise = instance.get('');
  return promise;
};
export const getPokemon = (id: number): Promise<AxiosResponse<PokStateType>> => {
  const promise = instance.get(`${id}`);
  return promise;
};
