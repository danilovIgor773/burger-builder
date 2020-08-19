import React from 'react';
import classes from '../NavigationItems/NavigationItems.css';
import NavigationItem from '../../Navigation/NavigationItems/NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem
            exact 
            link='/'>
        Burger Builder
        </NavigationItem>
        <NavigationItem 
            link='/orders'>
        Orders
        </NavigationItem>
        <NavigationItem 
            link='/authenticate'>
        Sign In
        </NavigationItem>
    </ul>
);

export default navigationItems;