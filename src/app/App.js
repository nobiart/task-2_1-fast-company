import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Main from './layouts/main';
import Login from './layouts/login';
import Users from './layouts/users';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProfessionProvider } from './hooks/useProfession';
import { QualitiesProvider } from './hooks/useQualities';
import AuthProvider from './hooks/useAuth';

const App = () => {
    return (
        <>
            <AuthProvider>
                <NavBar />
                <div className="container">
                    <QualitiesProvider>
                        <ProfessionProvider>
                            <Switch>
                                <Route path="/login/:type?" component={Login} />
                                <Route path="/users/:userId?/:edit?" component={Users} />
                                <Route path="/" exact component={Main} />
                                <Redirect to="/" />
                            </Switch>
                        </ProfessionProvider>
                    </QualitiesProvider>
                </div>
            </AuthProvider>
            <ToastContainer />
        </>
    );
};

export default App;
