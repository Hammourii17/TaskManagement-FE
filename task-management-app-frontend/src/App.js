import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Login from './auth/Login';
import Signup from './auth/Signup';
import TaskList from './Tasks/TaskList';
import TaskForm from './Tasks/TaskForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="container mx-auto p-4">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/tasks" component={TaskList} />
          <Route path="/create-task" component={TaskForm} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
