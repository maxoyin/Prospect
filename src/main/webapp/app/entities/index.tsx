import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Prospect from './prospect';
import Guarantor from './guarantor';
import Call from './call';
import Agent from './agent';
import OnboardingStage from './onboarding-stage';
import ProspectStageHistory from './prospect-stage-history';
import ProspectStageEventSourcing from './prospect-stage-event-sourcing';
import EntryChannel from './entry-channel';
import Address from './address';
import Location from './location';
import AssetType from './asset-type';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}prospect`} component={Prospect} />
      <ErrorBoundaryRoute path={`${match.url}guarantor`} component={Guarantor} />
      <ErrorBoundaryRoute path={`${match.url}call`} component={Call} />
      <ErrorBoundaryRoute path={`${match.url}agent`} component={Agent} />
      <ErrorBoundaryRoute path={`${match.url}onboarding-stage`} component={OnboardingStage} />
      <ErrorBoundaryRoute path={`${match.url}prospect-stage-history`} component={ProspectStageHistory} />
      <ErrorBoundaryRoute path={`${match.url}prospect-stage-event-sourcing`} component={ProspectStageEventSourcing} />
      <ErrorBoundaryRoute path={`${match.url}entry-channel`} component={EntryChannel} />
      <ErrorBoundaryRoute path={`${match.url}address`} component={Address} />
      <ErrorBoundaryRoute path={`${match.url}location`} component={Location} />
      <ErrorBoundaryRoute path={`${match.url}asset-type`} component={AssetType} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
