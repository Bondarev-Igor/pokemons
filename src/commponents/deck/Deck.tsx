import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import pokoLogo from '../../images/logoPok.jpg';

import { fetchPokemons, PokemonType } from '../../bll/pokemonReducer';

import { AppRootStateType } from '../../bll/store';
import { Card } from '../card/Card';
import styles from './Deck.module.scss';

export const Deck: React.FC = () => {
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemons(baseUrl));
  }, [dispatch]);

  const pokemons = useSelector<AppRootStateType, PokemonType[]>((state) => state.pokemons.results);
  const next = useSelector<AppRootStateType, string >((state) => state.pokemons.next);
  const previous = useSelector<AppRootStateType, string>((state) => state.pokemons.previous);

  const newPage = (url: any) => {
    dispatch(fetchPokemons(url));
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.article}>
        <img className={styles.pikachu} src={pokoLogo} alt="logo" />
      </div>
      <div className={styles.wrapperCards}>
        {
          pokemons.map((pok) => (
            <NavLink to={`/${pok.id}`}>
              <Card key={pok.id} id={pok.id} name={pok.name} image={pok.image} />
            </NavLink>
          ))
        }
      </div>
      <div className={styles.buttons}>
        <button type="button" onClick={() => { newPage(previous); }}>Previous</button>
        <button type="button" onClick={() => { newPage(next); }}>Next</button>
      </div>
    </div>
  );
};
