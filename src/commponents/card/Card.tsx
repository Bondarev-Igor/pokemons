import React from 'react';

import styles from './Card.module.scss';

export type CardPropsType = {
  name: string;
  image: string;
  id: number;
};

export const Card: React.FC<CardPropsType> = ({ name, image, id }) => (

  <div className={styles.wrapperCard}>
    <div className={styles.cardPokemon}>
      <div className={styles.imgPokemon}>
        <img className={styles.picOfPokemon} src={image} alt="Piсture of Pokemon" />
      </div>
      <div className={styles.namePokemon}>
        <span>
          {id}
          .
        </span>
        <span>{name}</span>
      </div>
    </div>
  </div>
);
