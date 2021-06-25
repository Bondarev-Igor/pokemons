import axios, { AxiosResponse } from 'axios';
// eslint-disable-next-line import/no-cycle
import { ServerPokemonType } from 'bll/pokemonsReducer';

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/',
});

export const getPokemons = (
  startPoint: number,
  count: number,
): Promise<AxiosResponse<ServerPokemonType>> => instance.get(`?offset=${startPoint}&limit=${count}`);

export const getPokemon = (
  id: number | string,
): Promise<AxiosResponse<any>> => instance.get(`${id}`);
