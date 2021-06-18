import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
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

  // eslint-disable-next-line max-len
  const pokemons = useSelector<AppRootStateType, PokemonType[]>((state) => state.pokemons.results);
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
      <div className={styles.buttons}>
        <button type="button">Previous</button>
        <button type="button">Next</button>
      </div>
    </div>
  );
};
