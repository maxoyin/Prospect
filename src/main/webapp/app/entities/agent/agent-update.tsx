import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAddress } from 'app/shared/model/address.model';
import { getEntities as getAddresses } from 'app/entities/address/address.reducer';
import { getEntity, updateEntity, createEntity, reset } from './agent.reducer';
import { IAgent } from 'app/shared/model/agent.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAgentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AgentUpdate = (props: IAgentUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { agentEntity, addresses, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/agent' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAddresses();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.dateEnrolled = convertDateTimeToServer(values.dateEnrolled);
    values.lastRegistration = convertDateTimeToServer(values.lastRegistration);
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updatedAt = convertDateTimeToServer(values.updatedAt);

    if (errors.length === 0) {
      const entity = {
        ...agentEntity,
        ...values,
        address: addresses.find(it => it.id.toString() === values.addressId.toString()),
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
          <h2 id="prospectServiceApp.agent.home.createOrEditLabel" data-cy="AgentCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.agent.home.createOrEditLabel">Create or edit a Agent</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : agentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="agent-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="agent-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="roleLabel" for="agent-role">
                  <Translate contentKey="prospectServiceApp.agent.role">Role</Translate>
                </Label>
                <AvField
                  id="agent-role"
                  data-cy="role"
                  type="text"
                  name="role"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="agent-lastName">
                  <Translate contentKey="prospectServiceApp.agent.lastName">Last Name</Translate>
                </Label>
                <AvField id="agent-lastName" data-cy="lastName" type="text" name="lastName" />
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="agent-firstName">
                  <Translate contentKey="prospectServiceApp.agent.firstName">First Name</Translate>
                </Label>
                <AvField id="agent-firstName" data-cy="firstName" type="text" name="firstName" />
              </AvGroup>
              <AvGroup>
                <Label id="codeLabel" for="agent-code">
                  <Translate contentKey="prospectServiceApp.agent.code">Code</Translate>
                </Label>
                <AvField id="agent-code" data-cy="code" type="text" name="code" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="agent-status">
                  <Translate contentKey="prospectServiceApp.agent.status">Status</Translate>
                </Label>
                <AvField id="agent-status" data-cy="status" type="text" name="status" />
              </AvGroup>
              <AvGroup>
                <Label id="dateEnrolledLabel" for="agent-dateEnrolled">
                  <Translate contentKey="prospectServiceApp.agent.dateEnrolled">Date Enrolled</Translate>
                </Label>
                <AvInput
                  id="agent-dateEnrolled"
                  data-cy="dateEnrolled"
                  type="datetime-local"
                  className="form-control"
                  name="dateEnrolled"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.agentEntity.dateEnrolled)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="registeredProspectsLabel" for="agent-registeredProspects">
                  <Translate contentKey="prospectServiceApp.agent.registeredProspects">Registered Prospects</Translate>
                </Label>
                <AvField
                  id="agent-registeredProspects"
                  data-cy="registeredProspects"
                  type="string"
                  className="form-control"
                  name="registeredProspects"
                />
                <UncontrolledTooltip target="registeredProspectsLabel">
                  <Translate contentKey="prospectServiceApp.agent.help.registeredProspects" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="activatedProspectsLabel" for="agent-activatedProspects">
                  <Translate contentKey="prospectServiceApp.agent.activatedProspects">Activated Prospects</Translate>
                </Label>
                <AvField
                  id="agent-activatedProspects"
                  data-cy="activatedProspects"
                  type="string"
                  className="form-control"
                  name="activatedProspects"
                />
                <UncontrolledTooltip target="activatedProspectsLabel">
                  <Translate contentKey="prospectServiceApp.agent.help.activatedProspects" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="inPipelineLabel" for="agent-inPipeline">
                  <Translate contentKey="prospectServiceApp.agent.inPipeline">In Pipeline</Translate>
                </Label>
                <AvField id="agent-inPipeline" data-cy="inPipeline" type="string" className="form-control" name="inPipeline" />
                <UncontrolledTooltip target="inPipelineLabel">
                  <Translate contentKey="prospectServiceApp.agent.help.inPipeline" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="lastRegistrationLabel" for="agent-lastRegistration">
                  <Translate contentKey="prospectServiceApp.agent.lastRegistration">Last Registration</Translate>
                </Label>
                <AvInput
                  id="agent-lastRegistration"
                  data-cy="lastRegistration"
                  type="datetime-local"
                  className="form-control"
                  name="lastRegistration"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.agentEntity.lastRegistration)}
                />
                <UncontrolledTooltip target="lastRegistrationLabel">
                  <Translate contentKey="prospectServiceApp.agent.help.lastRegistration" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="createdAtLabel" for="agent-createdAt">
                  <Translate contentKey="prospectServiceApp.agent.createdAt">Created At</Translate>
                </Label>
                <AvInput
                  id="agent-createdAt"
                  data-cy="createdAt"
                  type="datetime-local"
                  className="form-control"
                  name="createdAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.agentEntity.createdAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedAtLabel" for="agent-updatedAt">
                  <Translate contentKey="prospectServiceApp.agent.updatedAt">Updated At</Translate>
                </Label>
                <AvInput
                  id="agent-updatedAt"
                  data-cy="updatedAt"
                  type="datetime-local"
                  className="form-control"
                  name="updatedAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.agentEntity.updatedAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="agent-address">
                  <Translate contentKey="prospectServiceApp.agent.address">Address</Translate>
                </Label>
                <AvInput id="agent-address" data-cy="address" type="select" className="form-control" name="addressId">
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
              <Button tag={Link} id="cancel-save" to="/agent" replace color="info">
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
  agentEntity: storeState.agent.entity,
  loading: storeState.agent.loading,
  updating: storeState.agent.updating,
  updateSuccess: storeState.agent.updateSuccess,
});

const mapDispatchToProps = {
  getAddresses,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AgentUpdate);
