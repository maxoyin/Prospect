import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IOnboardingStage } from 'app/shared/model/onboarding-stage.model';
import { getEntities as getOnboardingStages } from 'app/entities/onboarding-stage/onboarding-stage.reducer';
import { IProspect } from 'app/shared/model/prospect.model';
import { getEntities as getProspects } from 'app/entities/prospect/prospect.reducer';
import { getEntity, updateEntity, createEntity, reset } from './prospect-stage-history.reducer';
import { IProspectStageHistory } from 'app/shared/model/prospect-stage-history.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProspectStageHistoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProspectStageHistoryUpdate = (props: IProspectStageHistoryUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { prospectStageHistoryEntity, onboardingStages, prospects, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/prospect-stage-history');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getOnboardingStages();
    props.getProspects();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.createdAt = convertDateTimeToServer(values.createdAt);

    if (errors.length === 0) {
      const entity = {
        ...prospectStageHistoryEntity,
        ...values,
        fromStage: onboardingStages.find(it => it.id.toString() === values.fromStageId.toString()),
        toStage: onboardingStages.find(it => it.id.toString() === values.toStageId.toString()),
        prospect: prospects.find(it => it.id.toString() === values.prospectId.toString()),
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
          <h2 id="prospectServiceApp.prospectStageHistory.home.createOrEditLabel" data-cy="ProspectStageHistoryCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.prospectStageHistory.home.createOrEditLabel">
              Create or edit a ProspectStageHistory
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : prospectStageHistoryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="prospect-stage-history-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="prospect-stage-history-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="prospect-stage-history-name">
                  <Translate contentKey="prospectServiceApp.prospectStageHistory.name">Name</Translate>
                </Label>
                <AvField id="prospect-stage-history-name" data-cy="name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="createdAtLabel" for="prospect-stage-history-createdAt">
                  <Translate contentKey="prospectServiceApp.prospectStageHistory.createdAt">Created At</Translate>
                </Label>
                <AvInput
                  id="prospect-stage-history-createdAt"
                  data-cy="createdAt"
                  type="datetime-local"
                  className="form-control"
                  name="createdAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.prospectStageHistoryEntity.createdAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="prospect-stage-history-fromStage">
                  <Translate contentKey="prospectServiceApp.prospectStageHistory.fromStage">From Stage</Translate>
                </Label>
                <AvInput
                  id="prospect-stage-history-fromStage"
                  data-cy="fromStage"
                  type="select"
                  className="form-control"
                  name="fromStageId"
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
                <Label for="prospect-stage-history-toStage">
                  <Translate contentKey="prospectServiceApp.prospectStageHistory.toStage">To Stage</Translate>
                </Label>
                <AvInput id="prospect-stage-history-toStage" data-cy="toStage" type="select" className="form-control" name="toStageId">
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
                <Label for="prospect-stage-history-prospect">
                  <Translate contentKey="prospectServiceApp.prospectStageHistory.prospect">Prospect</Translate>
                </Label>
                <AvInput id="prospect-stage-history-prospect" data-cy="prospect" type="select" className="form-control" name="prospectId">
                  <option value="" key="0" />
                  {prospects
                    ? prospects.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/prospect-stage-history" replace color="info">
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
  onboardingStages: storeState.onboardingStage.entities,
  prospects: storeState.prospect.entities,
  prospectStageHistoryEntity: storeState.prospectStageHistory.entity,
  loading: storeState.prospectStageHistory.loading,
  updating: storeState.prospectStageHistory.updating,
  updateSuccess: storeState.prospectStageHistory.updateSuccess,
});

const mapDispatchToProps = {
  getOnboardingStages,
  getProspects,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProspectStageHistoryUpdate);
