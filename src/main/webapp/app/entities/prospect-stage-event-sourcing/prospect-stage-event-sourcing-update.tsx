import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './prospect-stage-event-sourcing.reducer';
import { IProspectStageEventSourcing } from 'app/shared/model/prospect-stage-event-sourcing.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProspectStageEventSourcingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProspectStageEventSourcingUpdate = (props: IProspectStageEventSourcingUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { prospectStageEventSourcingEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/prospect-stage-event-sourcing');
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

    if (errors.length === 0) {
      const entity = {
        ...prospectStageEventSourcingEntity,
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
          <h2
            id="prospectServiceApp.prospectStageEventSourcing.home.createOrEditLabel"
            data-cy="ProspectStageEventSourcingCreateUpdateHeading"
          >
            <Translate contentKey="prospectServiceApp.prospectStageEventSourcing.home.createOrEditLabel">
              Create or edit a ProspectStageEventSourcing
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : prospectStageEventSourcingEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="prospect-stage-event-sourcing-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="prospect-stage-event-sourcing-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="createdAtLabel" for="prospect-stage-event-sourcing-createdAt">
                  <Translate contentKey="prospectServiceApp.prospectStageEventSourcing.createdAt">Created At</Translate>
                </Label>
                <AvInput
                  id="prospect-stage-event-sourcing-createdAt"
                  data-cy="createdAt"
                  type="datetime-local"
                  className="form-control"
                  name="createdAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.prospectStageEventSourcingEntity.createdAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="propsectIdLabel" for="prospect-stage-event-sourcing-propsectId">
                  <Translate contentKey="prospectServiceApp.prospectStageEventSourcing.propsectId">Propsect Id</Translate>
                </Label>
                <AvField id="prospect-stage-event-sourcing-propsectId" data-cy="propsectId" type="text" name="propsectId" />
              </AvGroup>
              <AvGroup>
                <Label id="eventLabel" for="prospect-stage-event-sourcing-event">
                  <Translate contentKey="prospectServiceApp.prospectStageEventSourcing.event">Event</Translate>
                </Label>
                <AvField id="prospect-stage-event-sourcing-event" data-cy="event" type="text" name="event" />
              </AvGroup>
              <AvGroup>
                <Label id="payloadLabel" for="prospect-stage-event-sourcing-payload">
                  <Translate contentKey="prospectServiceApp.prospectStageEventSourcing.payload">Payload</Translate>
                </Label>
                <AvField id="prospect-stage-event-sourcing-payload" data-cy="payload" type="text" name="payload" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/prospect-stage-event-sourcing" replace color="info">
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
  prospectStageEventSourcingEntity: storeState.prospectStageEventSourcing.entity,
  loading: storeState.prospectStageEventSourcing.loading,
  updating: storeState.prospectStageEventSourcing.updating,
  updateSuccess: storeState.prospectStageEventSourcing.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProspectStageEventSourcingUpdate);
