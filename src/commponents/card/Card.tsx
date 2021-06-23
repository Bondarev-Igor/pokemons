// import { fetchPokemon } from 'bll/pokReducer';
import React from 'react';
// import { useDispatch } from 'react-redux';

import styles from './Card.module.scss';

export type CardPropsType = {
  name: string;
  url: string;
};

export const Card: React.FC<CardPropsType> = ({ name, url }) => (
// const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchPokemon(url));
  // }, [dispatch, url]);
  <div className={styles.wrapperCard}>
    <div className={styles.cardPokemon}>
      {/* <div className={styles.imgPokemon}>
        <img className={styles.picOfPokemon} src={image} alt="Piсture of Pokemon" />
      </div> */}
      <div className={styles.namePokemon}>
        {/* <span>
          {id}
          .
        </span> */}
        <span>{name}</span>
      </div>
    </div>
  </div>
);
