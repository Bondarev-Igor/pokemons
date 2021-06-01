import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import pokoLogo from './logoPok.jpg';

import { fetchPokemonsTC, PokemonType } from '../../bll/pokemonReducer';

import './Deck.css';
import { AppRootStateType } from '../../bll/store';
import { Card } from '../card/Card';

export const Deck: React.FC = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   getPokemons().then((res) => {
  //     debugger; // eslint-disable-line
  //     dispatch(setPokemonsAC(res.data.results));
  //   });
  // });

  useEffect(() => {
    const thunk = fetchPokemonsTC();
    dispatch(thunk);
  });

  const pokemons = useSelector<AppRootStateType, Array<PokemonType>>((state): any => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    state.pokemons.results;
  });
  console.log(pokemons);

  return (
    <div className="mainWrapper">
      {/* <div>
        <div className="sales"></div>
        <div className="navPok">
          <h1>Pokemons</h1>
        </div>
      </div> */}
      <div className="article">
        <img className="pikachu" src={pokoLogo} alt="logo" />
      </div>
      {/* <div className="wrapperCards">
        {
          pokemons.map((pok) => <Card key={pok.name} id={pok.name} />)
        }
      </div> */}
    </div>
  );
};
