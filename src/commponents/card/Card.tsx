import React from 'react';

import styles from './Card.module.scss';

export type CardPropsType = {
  name: string;
  image: string;
  id: number;
  type: string;
};

export const Card: React.FC<CardPropsType> = ({
  name, image, id, type,
}) => (

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
      <small className={styles.type}>
        Type:
        <span>{type}</span>
      </small>
    </div>
  </div>
);
