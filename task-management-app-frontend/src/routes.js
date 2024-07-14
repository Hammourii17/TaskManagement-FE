import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import TaskList from './components/Tasks/TaskList';
import TaskForm from './components/Tasks/TaskForm';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

const Routes = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Header />
      <main className="container mx-auto p-4">
        <Switch>
          <Route path="/login">
            {isAuthenticated ? <Redirect to="/tasks" /> : <Login />}
          </Route>
          <Route path="/signup">
            {isAuthenticated ? <Redirect to="/tasks" /> : <Signup />}
          </Route>
          <Route path="/tasks">
            {isAuthenticated ? <TaskList /> : <Redirect to="/login" />}
          </Route>
          <Route path="/create-task">
            {isAuthenticated ? <TaskForm /> : <Redirect to="/login" />}
          </Route>
          <Route path="/" exact>
            {isAuthenticated ? <Redirect to="/tasks" /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
};

export default Routes;
