import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './prospect.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProspectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProspectDetail = (props: IProspectDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { prospectEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="prospectDetailsHeading">
          <Translate contentKey="prospectServiceApp.prospect.detail.title">Prospect</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.id}</dd>
          <dt>
            <span id="prospectiveId">
              <Translate contentKey="prospectServiceApp.prospect.prospectiveId">Prospective Id</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.prospectiveId}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="prospectServiceApp.prospect.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.lastName}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="prospectServiceApp.prospect.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.firstName}</dd>
          <dt>
            <span id="otherNames">
              <Translate contentKey="prospectServiceApp.prospect.otherNames">Other Names</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.otherNames}</dd>
          <dt>
            <span id="dateOfBirth">
              <Translate contentKey="prospectServiceApp.prospect.dateOfBirth">Date Of Birth</Translate>
            </span>
          </dt>
          <dd>
            {prospectEntity.dateOfBirth ? <TextFormat value={prospectEntity.dateOfBirth} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="gender">
              <Translate contentKey="prospectServiceApp.prospect.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.gender}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="prospectServiceApp.prospect.email">Email</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.email}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="prospectServiceApp.prospect.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.phone}</dd>
          <dt>
            <span id="alternatePhone">
              <Translate contentKey="prospectServiceApp.prospect.alternatePhone">Alternate Phone</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.alternatePhone}</dd>
          <dt>
            <span id="disabilities">
              <Translate contentKey="prospectServiceApp.prospect.disabilities">Disabilities</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.disabilities}</dd>
          <dt>
            <span id="bvn">
              <Translate contentKey="prospectServiceApp.prospect.bvn">Bvn</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.bvn}</dd>
          <dt>
            <span id="bvnAddress">
              <Translate contentKey="prospectServiceApp.prospect.bvnAddress">Bvn Address</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.bvnAddress}</dd>
          <dt>
            <span id="isBvnVerified">
              <Translate contentKey="prospectServiceApp.prospect.isBvnVerified">Is Bvn Verified</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.isBvnVerified ? 'true' : 'false'}</dd>
          <dt>
            <span id="bvnInformation">
              <Translate contentKey="prospectServiceApp.prospect.bvnInformation">Bvn Information</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.bvnInformation}</dd>
          <dt>
            <span id="driversLicenseNumber">
              <Translate contentKey="prospectServiceApp.prospect.driversLicenseNumber">Drivers License Number</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.driversLicenseNumber}</dd>
          <dt>
            <span id="driversLicenseExpiry">
              <Translate contentKey="prospectServiceApp.prospect.driversLicenseExpiry">Drivers License Expiry</Translate>
            </span>
          </dt>
          <dd>
            {prospectEntity.driversLicenseExpiry ? (
              <TextFormat value={prospectEntity.driversLicenseExpiry} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dateAvailableForTest">
              <Translate contentKey="prospectServiceApp.prospect.dateAvailableForTest">Date Available For Test</Translate>
            </span>
          </dt>
          <dd>
            {prospectEntity.dateAvailableForTest ? (
              <TextFormat value={prospectEntity.dateAvailableForTest} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="photoUrl">
              <Translate contentKey="prospectServiceApp.prospect.photoUrl">Photo Url</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.photoUrl}</dd>
          <dt>
            <span id="noShowCount">
              <Translate contentKey="prospectServiceApp.prospect.noShowCount">No Show Count</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.noShowCount}</dd>
          <dt>
            <span id="activated">
              <Translate contentKey="prospectServiceApp.prospect.activated">Activated</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.activated ? 'true' : 'false'}</dd>
          <dt>
            <span id="inRecovery">
              <Translate contentKey="prospectServiceApp.prospect.inRecovery">In Recovery</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.inRecovery ? 'true' : 'false'}</dd>
          <dt>
            <span id="retrain">
              <Translate contentKey="prospectServiceApp.prospect.retrain">Retrain</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.retrain ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="prospectServiceApp.prospect.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.createdAt ? <TextFormat value={prospectEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updatedAt">
              <Translate contentKey="prospectServiceApp.prospect.updatedAt">Updated At</Translate>
            </span>
          </dt>
          <dd>{prospectEntity.updatedAt ? <TextFormat value={prospectEntity.updatedAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.prospect.address">Address</Translate>
          </dt>
          <dd>{prospectEntity.address ? prospectEntity.address.id : ''}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.prospect.onboardingStage">Onboarding Stage</Translate>
          </dt>
          <dd>{prospectEntity.onboardingStage ? prospectEntity.onboardingStage.id : ''}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.prospect.location">Location</Translate>
          </dt>
          <dd>{prospectEntity.location ? prospectEntity.location.id : ''}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.prospect.agent">Agent</Translate>
          </dt>
          <dd>{prospectEntity.agent ? prospectEntity.agent.id : ''}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.prospect.entryChannel">Entry Channel</Translate>
          </dt>
          <dd>{prospectEntity.entryChannel ? prospectEntity.entryChannel.id : ''}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.prospect.assetType">Asset Type</Translate>
          </dt>
          <dd>
            {prospectEntity.assetTypes
              ? prospectEntity.assetTypes.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {prospectEntity.assetTypes && i === prospectEntity.assetTypes.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/prospect" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/prospect/${prospectEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ prospect }: IRootState) => ({
  prospectEntity: prospect.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProspectDetail);
