import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ShowCreators} />
        <Route path="/creators/:id" component={ViewCreator} />
        <Route path="/edit/:id" component={EditCreator} />
        <Route path="/add" component={AddCreator} />
      </Switch>
    </Router>
  );
}

export default App;
