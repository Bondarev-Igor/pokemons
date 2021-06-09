import React from 'react';

import styles from './Card.module.css';

export type CardPropsType = {
  id: string;
};

export const Card: React.FC<CardPropsType> = ({ id }) => (
  // const { match } = props;
  // const { params } = match;
  // const { pokemonId } = params;
  <div className={styles.wrapperCard}>
    <div className={styles.picturePokemon}>
      <div>{id}</div>
    </div>
  </div>
);
