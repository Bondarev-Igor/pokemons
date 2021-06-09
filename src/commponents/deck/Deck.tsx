import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import pokoLogo from '../../images/logoPok.jpg';

import { fetchPokemonsTC, PokemonType } from '../../bll/pokemonReducer';

import styles from './Deck.module.scss';
import { AppRootStateType } from '../../bll/store';
import { Card } from '../card/Card';

export const Deck: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const thunk = fetchPokemonsTC();
    dispatch(thunk);
  }, []);

  // eslint-disable-next-line max-len
  const pokemons = useSelector<AppRootStateType, PokemonType[]>((state) => state.pokemons.results);
  // eslint-disable-next-line no-debugger
  debugger;
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.article}>
        <img className={styles.pikachu} src={pokoLogo} alt="logo" />
      </div>
      <div className={styles.wrapperCards}>
        {
          pokemons.map((pok) => (
            <Card key={pok.id} id={pok.id} name={pok.name} image={pok.image} />
          ))
        }
      </div>
    </div>
  );
};
