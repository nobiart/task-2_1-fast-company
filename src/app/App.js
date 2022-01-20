import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Main from './layouts/main';
import Login from './layouts/login';
import Users from './layouts/users';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProfessionProvider } from './hooks/useProfession';
import { QualityProvider } from './hooks/useQuality';

const App = () => {
    return (
        <>
            <NavBar />
            <div className="container">
                <Switch>
                    <ProfessionProvider>
                        <QualityProvider>
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/users/:userId?/:edit?" component={Users} />
                        </QualityProvider>
                    </ProfessionProvider>
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
                <ToastContainer/>
            </div>
        </>
    );
};

export default App;
