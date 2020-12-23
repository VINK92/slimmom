import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import withAuth from '../hocs/withAuth';

const PublicRoute = ({component: Componet,  isAuth, ...route}) => (
  <Route {...route} render={(props =>  isAuth && route.restricted ? <Redirect to='/diary' /> : <Componet {...props}/>  )} />
);

export default withAuth(PublicRoute);
