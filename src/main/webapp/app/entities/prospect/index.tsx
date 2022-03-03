import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Prospect from './prospect';
import ProspectDetail from './prospect-detail';
import ProspectUpdate from './prospect-update';
import ProspectDeleteDialog from './prospect-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProspectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProspectUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProspectDetail} />
      <ErrorBoundaryRoute path={match.url} component={Prospect} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProspectDeleteDialog} />
  </>
);

export default Routes;
