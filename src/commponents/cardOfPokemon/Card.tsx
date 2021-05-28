import './Card.css';

export const CardOfPokemon = (props: any) => {
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  return (
    <div className="wrapperCard">
      <div className="picturePokemon">{`This is page of ${pokemonId} page`}</div>
      <span>Name Pokemon</span>
    </div>
  );
};
