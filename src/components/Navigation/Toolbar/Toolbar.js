import React from 'react';
import classes from '../Toolbar/Toolbar.css';
import Logo from '../../../components/Logo/Logo'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div>Menu</div>
        <Logo />
        <nav>...</nav>
    </header>
);

export default toolbar;