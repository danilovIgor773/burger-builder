import React from 'react';
import avatarDump from '../../assets/images/user_logo_light.png';
import classes from '../Avatar/Avatar.css';

const avatar = (props) => (
    <div className={classes.Avatar}>
        <img src={avatarDump} alt='avatar'/>
    </div>
);

export default avatar;