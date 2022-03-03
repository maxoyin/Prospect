import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import OnboardingStage from './onboarding-stage';
import OnboardingStageDetail from './onboarding-stage-detail';
import OnboardingStageUpdate from './onboarding-stage-update';
import OnboardingStageDeleteDialog from './onboarding-stage-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OnboardingStageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OnboardingStageUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OnboardingStageDetail} />
      <ErrorBoundaryRoute path={match.url} component={OnboardingStage} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={OnboardingStageDeleteDialog} />
  </>
);

export default Routes;
