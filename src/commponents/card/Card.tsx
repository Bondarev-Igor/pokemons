import React from 'react';

import './Card.css';

type PropsType = {
  id: string
};

export const Card: React.FC<PropsType> = ({ id }) => (
  <div className="wrapperCard">
    <div className="picturePokemon">{`This is page of ${id}`}</div>
    <span>Name Pokemon</span>
  </div>
);
  // const { match } = props;
  // const { params } = match;
  // const { pokemonId } = params;
