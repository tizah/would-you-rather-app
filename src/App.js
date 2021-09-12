// Packages
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
// Action Creators
import { handleInitialData } from './actions/shared';
// Components
import Login from './components/Login';
import Home from './components/Home';
import QuestionPage from './components/QuestionAndAnswers';
import Leaderboard from './components/Leaderboard';
import NewQuestion from './components/NewQuestion';
import NoMatch from './components/PageNotFound'

// Component to be rendered in case of a 404 no match


class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <>
          <LoadingBar style={{ backgroundColor: '#00897B'}} />
          {
            this.props.loading
              ? null
              : <div className='app'>
                <Switch>
                  <Route exact path='/' component={Login} />
                  <Route exact path='/home' component={Home} />
                  <Route path='/questions/:id' component={QuestionPage} />
                  <Route exact path='/leaderboard' component={Leaderboard} />
                  <Route exact path='/add' component={NewQuestion} />
                  <Route component={NoMatch} />
                </Switch>
                </div>
          }
        </>
      </Router>
    );
  }
}

const mapStateToProps = ({ users }) => ({
    loading: users === {}
});

export default connect(mapStateToProps)(App);
