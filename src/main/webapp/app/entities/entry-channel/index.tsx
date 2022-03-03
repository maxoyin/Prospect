import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EntryChannel from './entry-channel';
import EntryChannelDetail from './entry-channel-detail';
import EntryChannelUpdate from './entry-channel-update';
import EntryChannelDeleteDialog from './entry-channel-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EntryChannelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EntryChannelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EntryChannelDetail} />
      <ErrorBoundaryRoute path={match.url} component={EntryChannel} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EntryChannelDeleteDialog} />
  </>
);

export default Routes;
