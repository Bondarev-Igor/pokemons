import axios, { AxiosResponse } from 'axios';
// eslint-disable-next-line import/no-cycle
import { ServerPokemonType } from 'bll/pokemonReducer';

export const getPokemons = (
  url: string,
): Promise<AxiosResponse<ServerPokemonType>> => axios.get(url);
