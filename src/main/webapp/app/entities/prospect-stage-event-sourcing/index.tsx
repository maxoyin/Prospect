import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProspectStageEventSourcing from './prospect-stage-event-sourcing';
import ProspectStageEventSourcingDetail from './prospect-stage-event-sourcing-detail';
import ProspectStageEventSourcingUpdate from './prospect-stage-event-sourcing-update';
import ProspectStageEventSourcingDeleteDialog from './prospect-stage-event-sourcing-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProspectStageEventSourcingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProspectStageEventSourcingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProspectStageEventSourcingDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProspectStageEventSourcing} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProspectStageEventSourcingDeleteDialog} />
  </>
);

export default Routes;
