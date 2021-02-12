import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "react-image-gallery/styles/css/image-gallery.css";

import Navbar from "./components/navbar.component";
import DetailsList from "./components/details-list.component";
import AdminList from "./components/admin-list.component";
import EditDetail from "./components/edit-detail.component";
import CreateDetail from "./components/create-detail.component";
import Login from './components/login';
import Register from './components/register';
import PrivateRoute from './hocs/privateRoute';
import DetailPage from './components/DetailPage/detailPage';

function App() {

    return (
        <Router>
            <div className="container">
                <div className="card text-white bg-secondary mb-3 text-right">QQ:654852818 for more details</div>
                <Navbar />
                <br />
                <Route path="/details/:id" exact component={DetailPage} />
                <Route path="/" exact component={DetailsList} />
                <PrivateRoute path="/admin" roles={["admin"]} component={AdminList} />
                <PrivateRoute path="/edit/:id" roles={["admin"]} component={EditDetail} />
                <PrivateRoute path="/create" roles={["admin"]} component={CreateDetail} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </div>
        </Router>

    );
}

export default App;