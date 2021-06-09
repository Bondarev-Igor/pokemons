import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import pokoLogo from './logoPok.jpg';

import { fetchPokemonsTC, PokemonType } from '../../bll/pokemonReducer';

import styles from './Deck.module.css';
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
  }, []);

  // eslint-disable-next-line max-len
  const pokemons = useSelector<AppRootStateType, Array<PokemonType>>((state): PokemonType[] => state.pokemons.results);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.article}>
        <img className={styles.pikachu} src={pokoLogo} alt="logo" />
      </div>
      <div className={styles.wrapperCards}>
        {
          pokemons.map((pok) => <Card key={pok.name} id={pok.name} />)
        }
      </div>
    </div>
  );
};
