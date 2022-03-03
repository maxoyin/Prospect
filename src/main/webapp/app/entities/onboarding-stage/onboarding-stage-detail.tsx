import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './onboarding-stage.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOnboardingStageDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OnboardingStageDetail = (props: IOnboardingStageDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { onboardingStageEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="onboardingStageDetailsHeading">
          <Translate contentKey="prospectServiceApp.onboardingStage.detail.title">OnboardingStage</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{onboardingStageEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="prospectServiceApp.onboardingStage.name">Name</Translate>
            </span>
          </dt>
          <dd>{onboardingStageEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="prospectServiceApp.onboardingStage.description">Description</Translate>
            </span>
          </dt>
          <dd>{onboardingStageEntity.description}</dd>
          <dt>
            <span id="rank">
              <Translate contentKey="prospectServiceApp.onboardingStage.rank">Rank</Translate>
            </span>
          </dt>
          <dd>{onboardingStageEntity.rank}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="prospectServiceApp.onboardingStage.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>
            {onboardingStageEntity.createdAt ? (
              <TextFormat value={onboardingStageEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="updatedAt">
              <Translate contentKey="prospectServiceApp.onboardingStage.updatedAt">Updated At</Translate>
            </span>
          </dt>
          <dd>
            {onboardingStageEntity.updatedAt ? (
              <TextFormat value={onboardingStageEntity.updatedAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/onboarding-stage" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/onboarding-stage/${onboardingStageEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ onboardingStage }: IRootState) => ({
  onboardingStageEntity: onboardingStage.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStageDetail);
