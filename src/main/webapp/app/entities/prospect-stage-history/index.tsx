import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProspectStageHistory from './prospect-stage-history';
import ProspectStageHistoryDetail from './prospect-stage-history-detail';
import ProspectStageHistoryUpdate from './prospect-stage-history-update';
import ProspectStageHistoryDeleteDialog from './prospect-stage-history-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProspectStageHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProspectStageHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProspectStageHistoryDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProspectStageHistory} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProspectStageHistoryDeleteDialog} />
  </>
);

export default Routes;
