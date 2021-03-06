import axios, { AxiosResponse } from 'axios';
// eslint-disable-next-line import/no-cycle
import { PokemonsDataType, ServerPokemonType } from 'bll/pokemonsReducer';

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/',
});

export const getPokemons = (
  startPoint: number,
  count: number,
): Promise<AxiosResponse<PokemonsDataType>> => instance.get(`?offset=${startPoint}&limit=${count}`);

export const getPokemon = (
  id: number | string,
): Promise<AxiosResponse<ServerPokemonType>> => instance.get(`${id}`);
