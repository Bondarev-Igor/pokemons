import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import pokoLogo from '../../images/logoPok.jpg';

import { fetchPokemons, PokemonType } from '../../bll/pokemonReducer';

import { AppRootStateType } from '../../bll/store';
import { Card } from '../card/Card';
import styles from './Deck.module.scss';

export const Deck: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  const pokemons = useSelector<AppRootStateType, PokemonType[]>((state) => state.pokemons.results);
  const next = useSelector<AppRootStateType, string >((state) => state.pokemons.next);
  const previous = useSelector<AppRootStateType, string>((state) => state.pokemons.previous);

  const newPage = async (url: string) => {
    // eslint-disable-next-line no-debugger
    debugger;
    const promise = await axios.get(`${url}`);
    dispatch(fetchPokemons());
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
        <button type="button">Previous</button>
        <button type="button" onClick={() => newPage(next)}>Next</button>
      </div>
    </div>
  );
};
