import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import {DISHES} from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';

class Main extends Component {

  constructor(props){
        super(props)
        this.state = {
          dishes: DISHES,
        };
    };

    // onDishSelect(dishId){
    //     this.setState({selectedDish: dishId})
    // }

    render () {
    const HomePage = () => {
        return(
            <Home 
            />
            );
    }
    return (
        <div>
        <Header/>
        <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
            <Redirect to="/home" />
        </Switch>
        {/* <Menu dishes={this.state.dishes} onClick={(dishId)=>this.onDishSelect(dishId)} /> */}
        {/* <DishDetail dish ={this.state.dishes.filter((dish)=>dish.id === this.state.selectedDish)[0]} /> */}
        <Footer/>
        </div>
      );
    };
}

export default Main;
