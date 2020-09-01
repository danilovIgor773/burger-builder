import React from 'react';
import classes from '../NavigationItems/NavigationItems.css';
import NavigationItem from '../../Navigation/NavigationItems/NavigationItem/NavigationItem';
import {useSelector} from 'react-redux'; 

const navigationItems = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isAuthenticated = useSelector(state => state.auth.token);
    
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem
                exact 
                link='/'>
                Burger Builder
            </NavigationItem>
            {isAuthenticated ? <NavigationItem 
                    link='/orders'>
                    Orders
                </NavigationItem> :
                null
            }
            {isAuthenticated ?
                <NavigationItem 
                    link='/logout'>
                    Logout
                </NavigationItem> : 
                <NavigationItem 
                    link='/authenticate'>
                    Authorize
                </NavigationItem>
            }
        </ul>    
    );            
};

export default navigationItems;