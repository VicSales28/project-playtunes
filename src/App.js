import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProfileEdit from './pages/ProfileEdit';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Album from './pages/Album';
import Search from './pages/Search';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/search" component={ Search } />
          <Route exact path="/" component={ Login } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
