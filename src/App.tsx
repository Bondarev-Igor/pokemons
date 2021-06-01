import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Deck } from './commponents/deck/Deck';
import { Card } from './commponents/card/Card';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" render={(props: any) => <Deck {...props} />} />
      <Route exact path="/:pokemonId" render={(props: any) => <Card {...props} />} />
    </Switch>
  </div>
);

export default App;
