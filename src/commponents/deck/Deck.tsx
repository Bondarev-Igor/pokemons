import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { paginationAC, PaginationType } from 'bll/paginationReducer';
import pokoLogo from '../../images/logoPok.jpg';

import { fetchPokemons, ServerPokemonType } from '../../bll/pokemonsReducer';

import { AppRootStateType } from '../../bll/store';
import { Card } from '../card/Card';
import styles from './Deck.module.scss';

export const Deck: React.FC = () => {
  const dispatch = useDispatch();

  const pokemons = useSelector<AppRootStateType, ServerPokemonType[]>(
    (state) => state.pokemons.results,
  );
  const countPokemons = useSelector<AppRootStateType, number>(
    (state) => state.pokemons.count,
  );
  const pagination = useSelector<AppRootStateType, PaginationType>(
    (state) => state.pagination,
  );
  useEffect(() => {
    dispatch(fetchPokemons(pagination.startPoint, pagination.count));
  }, [dispatch, pagination.count, pagination.startPoint]);

  const nextPage = () => {
    dispatch(paginationAC(pagination.startPoint + pagination.count, pagination.count));
  };
  const previousPage = () => {
    dispatch(paginationAC(pagination.startPoint - pagination.count, pagination.count));
  };

  return (
    <div className={styles.rootWrapper}>
      <div className={styles.mainWrapper}>
        <div className={styles.logo}>
          <img className={styles.pikachu} src={pokoLogo} alt="logo" />
        </div>
        <div className={styles.wrapperCards}>
          {
            pokemons.map((pok) => (
              <NavLink key={pok.name} to={`/${pok.name}`} style={{ textDecoration: 'none' }}>
                <Card
                  image={pok.sprites?.other['official-artwork'].front_default}
                  id={pok.id}
                  name={pok.name}
                  type={pok.types[0].type.name}
                />
              </NavLink>
            ))
          }
        </div>
        <div className={styles.blockButtons}>
          <button className={styles.button} type="button" disabled={pagination.startPoint === 0} onClick={previousPage}>Previous</button>
          <button className={styles.button} type="button" onClick={nextPage}>Next</button>
        </div>
      </div>
    </div>
  );
};
