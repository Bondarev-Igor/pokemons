import React from 'react';

import './Card.css';

export type CardPropsType = {
  id: string;
};

export const Card: React.FC<CardPropsType> = ({ id }) => (
  // const { match } = props;
  // const { params } = match;
  // const { pokemonId } = params;
  <div className="wrapperCard">
    <div className="picturePokemon">
      <div>{id}</div>
    </div>
  </div>
);
