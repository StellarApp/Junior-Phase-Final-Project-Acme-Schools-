import React, { Component } from "react";
import { BrowserRouter, HashRouter, Route } from "react-router-dom";
import Students from "./Components/Students";
import Schools from "./Components/Schools";
import CreateStudent from "./Components/CreateStudent.js";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import { actions } from "./store";
import { connect } from "react-redux";

class App extends Component {
  constructor(){
    super(),
    this.state = {}
  }
  
  componentDidMount() {
    this.props.fetchSchools(), 
    this.props.fetchStudents();
  }

  render() {
    return (
      <HashRouter>
        <Route component={Nav} />
        <Route path="/" component={CreateStudent} />
        <Route exact path="/" component={Home} />
        <Route exact path="/students" component={Students} />
        <Route exact path="/schools" component={Schools} />
        <Route path="/schools/:id" component={Students} />
      </HashRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSchools: () => dispatch(actions.fetchSchools()),
    fetchStudents: () => dispatch(actions.fetchStudents())
  };
};

const mapStateToProps = ({ students, schools }) => ({ students, schools });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
