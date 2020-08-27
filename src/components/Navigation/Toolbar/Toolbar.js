import React from 'react';
import classes from '../Toolbar/Toolbar.css';
import Logo from '../../../components/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Avatar from '../../Avatar/Avatar';
import {useSelector} from 'react-redux';

const toolbar = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isAuthenticated = useSelector(state => state.auth.token);
    let avatar = null;
    if(isAuthenticated){
        avatar = (
            <div className={classes.Avatar}>
                <Avatar />
            </div> 
        );
    }
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <div className={classes.Logo}>
                <Logo />
            </div>        
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
            {avatar} 
        </header>
    );
    
}

export default toolbar;