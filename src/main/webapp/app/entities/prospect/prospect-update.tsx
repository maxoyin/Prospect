import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAddress } from 'app/shared/model/address.model';
import { getEntities as getAddresses } from 'app/entities/address/address.reducer';
import { IOnboardingStage } from 'app/shared/model/onboarding-stage.model';
import { getEntities as getOnboardingStages } from 'app/entities/onboarding-stage/onboarding-stage.reducer';
import { ILocation } from 'app/shared/model/location.model';
import { getEntities as getLocations } from 'app/entities/location/location.reducer';
import { IAgent } from 'app/shared/model/agent.model';
import { getEntities as getAgents } from 'app/entities/agent/agent.reducer';
import { IEntryChannel } from 'app/shared/model/entry-channel.model';
import { getEntities as getEntryChannels } from 'app/entities/entry-channel/entry-channel.reducer';
import { IAssetType } from 'app/shared/model/asset-type.model';
import { getEntities as getAssetTypes } from 'app/entities/asset-type/asset-type.reducer';
import { getEntity, updateEntity, createEntity, reset } from './prospect.reducer';
import { IProspect } from 'app/shared/model/prospect.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProspectUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProspectUpdate = (props: IProspectUpdateProps) => {
  const [idsassetType, setIdsassetType] = useState([]);
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { prospectEntity, addresses, onboardingStages, locations, agents, entryChannels, assetTypes, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/prospect' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAddresses();
    props.getOnboardingStages();
    props.getLocations();
    props.getAgents();
    props.getEntryChannels();
    props.getAssetTypes();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.dateOfBirth = convertDateTimeToServer(values.dateOfBirth);
    values.driversLicenseExpiry = convertDateTimeToServer(values.driversLicenseExpiry);
    values.dateAvailableForTest = convertDateTimeToServer(values.dateAvailableForTest);
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updatedAt = convertDateTimeToServer(values.updatedAt);

    if (errors.length === 0) {
      const entity = {
        ...prospectEntity,
        ...values,
        assetTypes: mapIdList(values.assetTypes),
        address: addresses.find(it => it.id.toString() === values.addressId.toString()),
        onboardingStage: onboardingStages.find(it => it.id.toString() === values.onboardingStageId.toString()),
        location: locations.find(it => it.id.toString() === values.locationId.toString()),
        agent: agents.find(it => it.id.toString() === values.agentId.toString()),
        entryChannel: entryChannels.find(it => it.id.toString() === values.entryChannelId.toString()),
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="prospectServiceApp.prospect.home.createOrEditLabel" data-cy="ProspectCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.prospect.home.createOrEditLabel">Create or edit a Prospect</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : prospectEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="prospect-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="prospect-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="prospectiveIdLabel" for="prospect-prospectiveId">
                  <Translate contentKey="prospectServiceApp.prospect.prospectiveId">Prospective Id</Translate>
                </Label>
                <AvField
                  id="prospect-prospectiveId"
                  data-cy="prospectiveId"
                  type="text"
                  name="prospectiveId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="prospect-lastName">
                  <Translate contentKey="prospectServiceApp.prospect.lastName">Last Name</Translate>
                </Label>
                <AvField id="prospect-lastName" data-cy="lastName" type="text" name="lastName" />
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="prospect-firstName">
                  <Translate contentKey="prospectServiceApp.prospect.firstName">First Name</Translate>
                </Label>
                <AvField id="prospect-firstName" data-cy="firstName" type="text" name="firstName" />
              </AvGroup>
              <AvGroup>
                <Label id="otherNamesLabel" for="prospect-otherNames">
                  <Translate contentKey="prospectServiceApp.prospect.otherNames">Other Names</Translate>
                </Label>
                <AvField id="prospect-otherNames" data-cy="otherNames" type="text" name="otherNames" />
              </AvGroup>
              <AvGroup>
                <Label id="dateOfBirthLabel" for="prospect-dateOfBirth">
                  <Translate contentKey="prospectServiceApp.prospect.dateOfBirth">Date Of Birth</Translate>
                </Label>
                <AvInput
                  id="prospect-dateOfBirth"
                  data-cy="dateOfBirth"
                  type="datetime-local"
                  className="form-control"
                  name="dateOfBirth"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.prospectEntity.dateOfBirth)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="genderLabel" for="prospect-gender">
                  <Translate contentKey="prospectServiceApp.prospect.gender">Gender</Translate>
                </Label>
                <AvInput
                  id="prospect-gender"
                  data-cy="gender"
                  type="select"
                  className="form-control"
                  name="gender"
                  value={(!isNew && prospectEntity.gender) || 'Male'}
                >
                  <option value="Male">{translate('prospectServiceApp.Gender.Male')}</option>
                  <option value="Female">{translate('prospectServiceApp.Gender.Female')}</option>
                  <option value="Others">{translate('prospectServiceApp.Gender.Others')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="prospect-email">
                  <Translate contentKey="prospectServiceApp.prospect.email">Email</Translate>
                </Label>
                <AvField id="prospect-email" data-cy="email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneLabel" for="prospect-phone">
                  <Translate contentKey="prospectServiceApp.prospect.phone">Phone</Translate>
                </Label>
                <AvField id="prospect-phone" data-cy="phone" type="text" name="phone" />
              </AvGroup>
              <AvGroup>
                <Label id="alternatePhoneLabel" for="prospect-alternatePhone">
                  <Translate contentKey="prospectServiceApp.prospect.alternatePhone">Alternate Phone</Translate>
                </Label>
                <AvField id="prospect-alternatePhone" data-cy="alternatePhone" type="text" name="alternatePhone" />
              </AvGroup>
              <AvGroup>
                <Label id="disabilitiesLabel" for="prospect-disabilities">
                  <Translate contentKey="prospectServiceApp.prospect.disabilities">Disabilities</Translate>
                </Label>
                <AvField id="prospect-disabilities" data-cy="disabilities" type="text" name="disabilities" />
              </AvGroup>
              <AvGroup>
                <Label id="bvnLabel" for="prospect-bvn">
                  <Translate contentKey="prospectServiceApp.prospect.bvn">Bvn</Translate>
                </Label>
                <AvField id="prospect-bvn" data-cy="bvn" type="text" name="bvn" />
              </AvGroup>
              <AvGroup>
                <Label id="bvnAddressLabel" for="prospect-bvnAddress">
                  <Translate contentKey="prospectServiceApp.prospect.bvnAddress">Bvn Address</Translate>
                </Label>
                <AvField id="prospect-bvnAddress" data-cy="bvnAddress" type="text" name="bvnAddress" />
              </AvGroup>
              <AvGroup check>
                <Label id="isBvnVerifiedLabel">
                  <AvInput
                    id="prospect-isBvnVerified"
                    data-cy="isBvnVerified"
                    type="checkbox"
                    className="form-check-input"
                    name="isBvnVerified"
                  />
                  <Translate contentKey="prospectServiceApp.prospect.isBvnVerified">Is Bvn Verified</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="bvnInformationLabel" for="prospect-bvnInformation">
                  <Translate contentKey="prospectServiceApp.prospect.bvnInformation">Bvn Information</Translate>
                </Label>
                <AvField id="prospect-bvnInformation" data-cy="bvnInformation" type="text" name="bvnInformation" />
              </AvGroup>
              <AvGroup>
                <Label id="driversLicenseNumberLabel" for="prospect-driversLicenseNumber">
                  <Translate contentKey="prospectServiceApp.prospect.driversLicenseNumber">Drivers License Number</Translate>
                </Label>
                <AvField id="prospect-driversLicenseNumber" data-cy="driversLicenseNumber" type="text" name="driversLicenseNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="driversLicenseExpiryLabel" for="prospect-driversLicenseExpiry">
                  <Translate contentKey="prospectServiceApp.prospect.driversLicenseExpiry">Drivers License Expiry</Translate>
                </Label>
                <AvInput
                  id="prospect-driversLicenseExpiry"
                  data-cy="driversLicenseExpiry"
                  type="datetime-local"
                  className="form-control"
                  name="driversLicenseExpiry"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.prospectEntity.driversLicenseExpiry)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dateAvailableForTestLabel" for="prospect-dateAvailableForTest">
                  <Translate contentKey="prospectServiceApp.prospect.dateAvailableForTest">Date Available For Test</Translate>
                </Label>
                <AvInput
                  id="prospect-dateAvailableForTest"
                  data-cy="dateAvailableForTest"
                  type="datetime-local"
                  className="form-control"
                  name="dateAvailableForTest"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.prospectEntity.dateAvailableForTest)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="photoUrlLabel" for="prospect-photoUrl">
                  <Translate contentKey="prospectServiceApp.prospect.photoUrl">Photo Url</Translate>
                </Label>
                <AvField id="prospect-photoUrl" data-cy="photoUrl" type="text" name="photoUrl" />
              </AvGroup>
              <AvGroup>
                <Label id="noShowCountLabel" for="prospect-noShowCount">
                  <Translate contentKey="prospectServiceApp.prospect.noShowCount">No Show Count</Translate>
                </Label>
                <AvField id="prospect-noShowCount" data-cy="noShowCount" type="string" className="form-control" name="noShowCount" />
              </AvGroup>
              <AvGroup check>
                <Label id="activatedLabel">
                  <AvInput id="prospect-activated" data-cy="activated" type="checkbox" className="form-check-input" name="activated" />
                  <Translate contentKey="prospectServiceApp.prospect.activated">Activated</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="inRecoveryLabel">
                  <AvInput id="prospect-inRecovery" data-cy="inRecovery" type="checkbox" className="form-check-input" name="inRecovery" />
                  <Translate contentKey="prospectServiceApp.prospect.inRecovery">In Recovery</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="retrainLabel">
                  <AvInput id="prospect-retrain" data-cy="retrain" type="checkbox" className="form-check-input" name="retrain" />
                  <Translate contentKey="prospectServiceApp.prospect.retrain">Retrain</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdAtLabel" for="prospect-createdAt">
                  <Translate contentKey="prospectServiceApp.prospect.createdAt">Created At</Translate>
                </Label>
                <AvInput
                  id="prospect-createdAt"
                  data-cy="createdAt"
                  type="datetime-local"
                  className="form-control"
                  name="createdAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.prospectEntity.createdAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedAtLabel" for="prospect-updatedAt">
                  <Translate contentKey="prospectServiceApp.prospect.updatedAt">Updated At</Translate>
                </Label>
                <AvInput
                  id="prospect-updatedAt"
                  data-cy="updatedAt"
                  type="datetime-local"
                  className="form-control"
                  name="updatedAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.prospectEntity.updatedAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="prospect-address">
                  <Translate contentKey="prospectServiceApp.prospect.address">Address</Translate>
                </Label>
                <AvInput id="prospect-address" data-cy="address" type="select" className="form-control" name="addressId">
                  <option value="" key="0" />
                  {addresses
                    ? addresses.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="prospect-onboardingStage">
                  <Translate contentKey="prospectServiceApp.prospect.onboardingStage">Onboarding Stage</Translate>
                </Label>
                <AvInput
                  id="prospect-onboardingStage"
                  data-cy="onboardingStage"
                  type="select"
                  className="form-control"
                  name="onboardingStageId"
                >
                  <option value="" key="0" />
                  {onboardingStages
                    ? onboardingStages.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="prospect-location">
                  <Translate contentKey="prospectServiceApp.prospect.location">Location</Translate>
                </Label>
                <AvInput id="prospect-location" data-cy="location" type="select" className="form-control" name="locationId">
                  <option value="" key="0" />
                  {locations
                    ? locations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="prospect-agent">
                  <Translate contentKey="prospectServiceApp.prospect.agent">Agent</Translate>
                </Label>
                <AvInput id="prospect-agent" data-cy="agent" type="select" className="form-control" name="agentId">
                  <option value="" key="0" />
                  {agents
                    ? agents.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="prospect-entryChannel">
                  <Translate contentKey="prospectServiceApp.prospect.entryChannel">Entry Channel</Translate>
                </Label>
                <AvInput id="prospect-entryChannel" data-cy="entryChannel" type="select" className="form-control" name="entryChannelId">
                  <option value="" key="0" />
                  {entryChannels
                    ? entryChannels.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="prospect-assetType">
                  <Translate contentKey="prospectServiceApp.prospect.assetType">Asset Type</Translate>
                </Label>
                <AvInput
                  id="prospect-assetType"
                  data-cy="assetType"
                  type="select"
                  multiple
                  className="form-control"
                  name="assetTypes"
                  value={!isNew && prospectEntity.assetTypes && prospectEntity.assetTypes.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {assetTypes
                    ? assetTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/prospect" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  addresses: storeState.address.entities,
  onboardingStages: storeState.onboardingStage.entities,
  locations: storeState.location.entities,
  agents: storeState.agent.entities,
  entryChannels: storeState.entryChannel.entities,
  assetTypes: storeState.assetType.entities,
  prospectEntity: storeState.prospect.entity,
  loading: storeState.prospect.loading,
  updating: storeState.prospect.updating,
  updateSuccess: storeState.prospect.updateSuccess,
});

const mapDispatchToProps = {
  getAddresses,
  getOnboardingStages,
  getLocations,
  getAgents,
  getEntryChannels,
  getAssetTypes,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProspectUpdate);
