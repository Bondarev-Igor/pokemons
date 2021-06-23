import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import pokoLogo from '../../images/logoPok.jpg';

import { fetchPokemons, ServerPokemonType } from '../../bll/pokemonReducer';

import { AppRootStateType } from '../../bll/store';
import { Card } from '../card/Card';
import styles from './Deck.module.scss';

export const Deck: React.FC = () => {
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=18';

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemons(baseUrl));
  }, [dispatch]);

  // eslint-disable-next-line max-len
  const pokemons = useSelector<AppRootStateType, ServerPokemonType[]>((state) => state.pokemons.results);
  const next = useSelector<AppRootStateType, string>((state) => state.pokemons.next);
  const previous = useSelector<AppRootStateType, string>((state) => state.pokemons.previous);

  const newPage = (url: string) => {
    dispatch(fetchPokemons(url));
  };

  return (
    <div className={styles.rootWrapper}>
      <div className={styles.mainWrapper}>
        <div className={styles.article}>
          <img className={styles.pikachu} src={pokoLogo} alt="logo" />
        </div>
        <div className={styles.wrapperCards}>
          {
            pokemons.map((pok) => (
              <NavLink to={`/${pok.name}`}>
                <Card key={pok.name} name={pok.name} />
              </NavLink>
            ))
          }
        </div>
        <div className={styles.buttons}>
          {previous
            ? <button type="button" onClick={() => { newPage(previous); }}>Previous</button>
            : null}
          <button type="button" onClick={() => { newPage(next); }}>Next</button>
        </div>
      </div>

    </div>

  );
};
