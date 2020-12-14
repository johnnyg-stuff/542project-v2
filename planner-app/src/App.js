import React, {useEffect, Component} from 'react';
import './App.css';
import AddProblem from './components/Problem/AddProblem';
import ViewProblem from "./components/Problem/ViewProblem";
import ViewProblemV1 from "./components/Problem/ViewProblemV1";
import ProblemFormComponent from "./components/Problem/ProblemFormComponent";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navigation from './components/Nav';
import Dashboard from './components/Dashboard/dashboard';

function App() {
  useEffect(() => {
    document.title = "Study Planner"
  }, []);

  return (
    <Router>
    <div className="App">
      <Navigation></Navigation>
      <Route path={["/", "/dashboard"]} exact strict component={Dashboard}/>
      <Route path="/problem/add" exact strict component={AddProblem}/>
      {/* <Route path="/problem/all" exact strict component={ViewProblem}/> */}
      <Route path="/problem/all" exact strict component={ViewProblem}/>
      <Route path="/test" exact strict component={ProblemFormComponent}/>
    </div>
    </Router>

  );
}

export default App;
