import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { CardOfPokemon } from '../cardOfPokemon/Card';
import pokoLogo from './logoPok.jpg';

import { pokemonAPI } from '../../api/pokemonApi';
import { setPokemonsAC } from '../../bll/pokemonReducer';

import './Deck.css';

export const DeckOfPokemon = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    pokemonAPI.getPokemons().then((res) => {
      console.log(res.data.results);
      dispatch(setPokemonsAC(res.data.results));
    });
  }, []);

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
      <div className="wrapperCards" />
    </div>
  );
};
