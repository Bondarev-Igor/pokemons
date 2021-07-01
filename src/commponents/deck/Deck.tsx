import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import pokoLogo from '../../images/logoPok.jpg';

import { fetchPokemons, ServerPokemonType } from '../../bll/pokemonsReducer';

import { AppRootStateType } from '../../bll/store';
import { Card } from '../card/Card';
import styles from './Deck.module.scss';

export const Deck: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemons(0, 18));
  }, [dispatch]);

  const pokemons = useSelector<AppRootStateType, ServerPokemonType[]>(
    (state) => state.pokemons.results,
  );
  // const newPage = (portion: number) => {
  //   // eslint-disable-next-line no-debugger
  //   debugger;
  //   dispatch(fetchPokemons(0 + portion, 18));
  // };

  return (
    <div className={styles.rootWrapper}>
      <div className={styles.mainWrapper}>
        <div className={styles.article}>
          <img className={styles.pikachu} src={pokoLogo} alt="logo" />
        </div>
        <div className={styles.wrapperCards}>
          {
            pokemons.map((pok) => (
              <NavLink key={pok.name} to={`/${pok.name}`}>
                <Card
                  name={pok.name}
                  image={pok.sprites?.other['official-artwork'].front_default}
                  id={pok.id}
                />
              </NavLink>
            ))
          }
        </div>
        {/* <div className={styles.buttons}>
          <button type="button" onClick={() => { newPage(-18); }}>Previous</button>
          <button type="button" onClick={() => { newPage(18); }}>Next</button>
        </div> */}
      </div>
    </div>
  );
};
