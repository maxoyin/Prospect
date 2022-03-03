import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    data-cy="entity"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/prospect">
      <Translate contentKey="global.menu.entities.prospect" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/guarantor">
      <Translate contentKey="global.menu.entities.guarantor" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/call">
      <Translate contentKey="global.menu.entities.call" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/agent">
      <Translate contentKey="global.menu.entities.agent" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/onboarding-stage">
      <Translate contentKey="global.menu.entities.onboardingStage" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/prospect-stage-history">
      <Translate contentKey="global.menu.entities.prospectStageHistory" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/prospect-stage-event-sourcing">
      <Translate contentKey="global.menu.entities.prospectStageEventSourcing" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entry-channel">
      <Translate contentKey="global.menu.entities.entryChannel" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/address">
      <Translate contentKey="global.menu.entities.address" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/location">
      <Translate contentKey="global.menu.entities.location" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/asset-type">
      <Translate contentKey="global.menu.entities.assetType" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
