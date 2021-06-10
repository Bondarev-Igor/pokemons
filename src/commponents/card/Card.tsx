import React from 'react';

import styles from './Card.module.scss';

export type CardPropsType = {
  id: number;
  name: string;
  image: string;
};

export const Card: React.FC<CardPropsType> = ({ id, name, image }) => (
  // const { match } = props;
  // const { params } = match;
  // const { pokemonId } = params;
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
