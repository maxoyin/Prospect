import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './onboarding-stage.reducer';
import { IOnboardingStage } from 'app/shared/model/onboarding-stage.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOnboardingStageUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OnboardingStageUpdate = (props: IOnboardingStageUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { onboardingStageEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/onboarding-stage');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updatedAt = convertDateTimeToServer(values.updatedAt);

    if (errors.length === 0) {
      const entity = {
        ...onboardingStageEntity,
        ...values,
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
          <h2 id="prospectServiceApp.onboardingStage.home.createOrEditLabel" data-cy="OnboardingStageCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.onboardingStage.home.createOrEditLabel">Create or edit a OnboardingStage</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : onboardingStageEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="onboarding-stage-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="onboarding-stage-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="onboarding-stage-name">
                  <Translate contentKey="prospectServiceApp.onboardingStage.name">Name</Translate>
                </Label>
                <AvField id="onboarding-stage-name" data-cy="name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="onboarding-stage-description">
                  <Translate contentKey="prospectServiceApp.onboardingStage.description">Description</Translate>
                </Label>
                <AvField id="onboarding-stage-description" data-cy="description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="rankLabel" for="onboarding-stage-rank">
                  <Translate contentKey="prospectServiceApp.onboardingStage.rank">Rank</Translate>
                </Label>
                <AvField id="onboarding-stage-rank" data-cy="rank" type="string" className="form-control" name="rank" />
              </AvGroup>
              <AvGroup>
                <Label id="createdAtLabel" for="onboarding-stage-createdAt">
                  <Translate contentKey="prospectServiceApp.onboardingStage.createdAt">Created At</Translate>
                </Label>
                <AvInput
                  id="onboarding-stage-createdAt"
                  data-cy="createdAt"
                  type="datetime-local"
                  className="form-control"
                  name="createdAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.onboardingStageEntity.createdAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedAtLabel" for="onboarding-stage-updatedAt">
                  <Translate contentKey="prospectServiceApp.onboardingStage.updatedAt">Updated At</Translate>
                </Label>
                <AvInput
                  id="onboarding-stage-updatedAt"
                  data-cy="updatedAt"
                  type="datetime-local"
                  className="form-control"
                  name="updatedAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.onboardingStageEntity.updatedAt)}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/onboarding-stage" replace color="info">
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
  onboardingStageEntity: storeState.onboardingStage.entity,
  loading: storeState.onboardingStage.loading,
  updating: storeState.onboardingStage.updating,
  updateSuccess: storeState.onboardingStage.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStageUpdate);
