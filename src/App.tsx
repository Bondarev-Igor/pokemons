import "./App.css";
import { DeckOfPokemon } from "./commponents/deckOfPokemon/Deck";
import { Switch, Route } from 'react-router-dom'
import { CardOfPokemon } from './commponents/cardOfPokemon/Card';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path = "/" render = {(props: any) => <DeckOfPokemon {...props} />}  />
        <Route exact path = "/:id" render = {(props: any) => <CardOfPokemon {...props} /> } />
      </Switch>
    </div>
  );
};

export default App;
