import React from 'react';

import styles from './Card.module.scss';

export type CardPropsType = {
  name: string;
  image: string;
  id: number;
  type: string;
};

type ColorType = {
  [key: string]:string
};

export const Card: React.FC<CardPropsType> = ({
  name, image, id, type,
}) => {
  const colors: ColorType = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
  };
  const mainTypes = Object.keys(colors);
  const pokType = mainTypes.find((el) => el === type);
  const color: string = colors[pokType];

  return (
    <div className={styles.wrapperCard}>
      <div className={styles.cardPokemon} style={{ backgroundColor: `${color}` }}>
        <div className={styles.imgPokemon}>
          <img className={styles.picOfPokemon} src={image} alt="Piсture of Pokemon" />
        </div>
        <div className={styles.info}>
          <span className={styles.number}>
            #
            {id.toString().padStart(4, '0')}
          </span>
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.type}>
            Type:
            {type}
          </span>
        </div>
      </div>
    </div>
  );
};
