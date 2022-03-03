import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAgent } from 'app/shared/model/agent.model';
import { getEntities as getAgents } from 'app/entities/agent/agent.reducer';
import { IProspect } from 'app/shared/model/prospect.model';
import { getEntities as getProspects } from 'app/entities/prospect/prospect.reducer';
import { getEntity, updateEntity, createEntity, reset } from './call.reducer';
import { ICall } from 'app/shared/model/call.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICallUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CallUpdate = (props: ICallUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { callEntity, agents, prospects, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/call');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAgents();
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
        ...callEntity,
        ...values,
        agent: agents.find(it => it.id.toString() === values.agentId.toString()),
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
          <h2 id="prospectServiceApp.call.home.createOrEditLabel" data-cy="CallCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.call.home.createOrEditLabel">Create or edit a Call</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : callEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="call-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="call-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="commentLabel" for="call-comment">
                  <Translate contentKey="prospectServiceApp.call.comment">Comment</Translate>
                </Label>
                <AvField id="call-comment" data-cy="comment" type="text" name="comment" />
              </AvGroup>
              <AvGroup>
                <Label id="createdAtLabel" for="call-createdAt">
                  <Translate contentKey="prospectServiceApp.call.createdAt">Created At</Translate>
                </Label>
                <AvInput
                  id="call-createdAt"
                  data-cy="createdAt"
                  type="datetime-local"
                  className="form-control"
                  name="createdAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.callEntity.createdAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="call-agent">
                  <Translate contentKey="prospectServiceApp.call.agent">Agent</Translate>
                </Label>
                <AvInput id="call-agent" data-cy="agent" type="select" className="form-control" name="agentId">
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
                <Label for="call-prospect">
                  <Translate contentKey="prospectServiceApp.call.prospect">Prospect</Translate>
                </Label>
                <AvInput id="call-prospect" data-cy="prospect" type="select" className="form-control" name="prospectId">
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
              <Button tag={Link} id="cancel-save" to="/call" replace color="info">
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
  agents: storeState.agent.entities,
  prospects: storeState.prospect.entities,
  callEntity: storeState.call.entity,
  loading: storeState.call.loading,
  updating: storeState.call.updating,
  updateSuccess: storeState.call.updateSuccess,
});

const mapDispatchToProps = {
  getAgents,
  getProspects,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CallUpdate);
