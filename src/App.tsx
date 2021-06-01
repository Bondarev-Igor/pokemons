import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { DeckOfPokemon } from './commponents/deckOfPokemon/Deck';
import { CardOfPokemon } from './commponents/cardOfPokemon/Card';

const App = (): any => (
  <div>
    <Switch>
      <Route exact path="/" render={(props: any) => <DeckOfPokemon {...props} />} />
      <Route exact path="/:pokemonId" render={(props: any) => <CardOfPokemon {...props} />} />
    </Switch>
  </div>
);

export default App;
