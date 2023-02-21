import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './component/UI/Header';
import Navbar from './component/UI/Navbar';
import Window from './component/UI/Window';
import s from './styles/App.module.css';

const App = () => {
    return (
        <div className={s.App}>
            <BrowserRouter>
                <Header/>
                <div className={s.App_body}>
                    <Navbar/>
                    <Window/>
                </div>  
            </BrowserRouter>
        </div>
    );
}

export default App;