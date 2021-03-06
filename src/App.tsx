import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { Deck } from './commponents/deck/Deck';
import { Card } from './commponents/card/Card';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" render={() => <Deck />} />
      <Route exact path="/:id" render={(props: any) => <Card {...props} />} />
    </Switch>
  </div>
);

export default App;
