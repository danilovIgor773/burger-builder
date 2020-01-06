import React from 'react';
import classes from '../NavigationItems/NavigationItems.css';
import NavigationItem from '../../Navigation/NavigationItems/NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem 
            link='/'
            active>
        Burger Builder
        </NavigationItem>
        <NavigationItem 
            link='/'>
        Checkout
        </NavigationItem>
    </ul>
);

export default navigationItems;