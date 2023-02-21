import React from 'react';
import AppRouter from '../AppRouter';
import s from '../../styles/Window.module.css'

const Window = () => {
    return (
        <div className={s.Window}>
            <AppRouter/>
        </div> 
    )
}

export default Window;