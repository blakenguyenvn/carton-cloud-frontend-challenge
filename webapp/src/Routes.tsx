import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
  ListDeliveriesPage,
  NewDeliveryPage,
  EditDeliveryPage
} from './pages/deliveries';
import { NotFoundPage } from './pages/NotFound';

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/"
      component={ListDeliveriesPage}
    />
    <Route
      exact
      path="/deliveries"
      component={ListDeliveriesPage}
    />
    <Route
      exact
      path="/deliveries/:id"
      component={EditDeliveryPage}
    />
    <Route
      exact
      path="/deliveries/new"
      component={NewDeliveryPage}
    />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;
