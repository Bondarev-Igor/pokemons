import "./DeckOfPokemon.css";
import { CardOfPokemon } from "../cardOfPokemon/CardOfPokemon";
import pokoLogo from './logoPok.jpg'
import { useEffect } from "react";
import { pokemonAPI } from '../../api/pokemonApi'

export const DeckOfPokemon = () => {

  useEffect (() => {
    pokemonAPI.getPokemons().then(res =>
      console.log(res.data.results)
      
  )})

  return (
    <div className = "mainWrapper">
      {/* <div>
        <div className="sales"></div>
        <div className="navPok">
          <h1>Pokemons</h1>
        </div>
      </div> */}
      <div className="article">
        <img className = "pikachu" src = {pokoLogo} alt = "logo" />
      </div>
      <div className="wrapperCards">
        <CardOfPokemon />
        <CardOfPokemon />
        <CardOfPokemon />
        <CardOfPokemon />
        <CardOfPokemon />
        <CardOfPokemon />
        <CardOfPokemon />
        <CardOfPokemon />
        <CardOfPokemon />
        <CardOfPokemon />
        <CardOfPokemon />
        <CardOfPokemon />
        <CardOfPokemon />
        <CardOfPokemon />
      </div>
    </div>
  );
};
