import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './agent.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAgentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AgentDetail = (props: IAgentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { agentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="agentDetailsHeading">
          <Translate contentKey="prospectServiceApp.agent.detail.title">Agent</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{agentEntity.id}</dd>
          <dt>
            <span id="role">
              <Translate contentKey="prospectServiceApp.agent.role">Role</Translate>
            </span>
          </dt>
          <dd>{agentEntity.role}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="prospectServiceApp.agent.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{agentEntity.lastName}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="prospectServiceApp.agent.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{agentEntity.firstName}</dd>
          <dt>
            <span id="code">
              <Translate contentKey="prospectServiceApp.agent.code">Code</Translate>
            </span>
          </dt>
          <dd>{agentEntity.code}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="prospectServiceApp.agent.status">Status</Translate>
            </span>
          </dt>
          <dd>{agentEntity.status}</dd>
          <dt>
            <span id="dateEnrolled">
              <Translate contentKey="prospectServiceApp.agent.dateEnrolled">Date Enrolled</Translate>
            </span>
          </dt>
          <dd>{agentEntity.dateEnrolled ? <TextFormat value={agentEntity.dateEnrolled} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="registeredProspects">
              <Translate contentKey="prospectServiceApp.agent.registeredProspects">Registered Prospects</Translate>
            </span>
            <UncontrolledTooltip target="registeredProspects">
              <Translate contentKey="prospectServiceApp.agent.help.registeredProspects" />
            </UncontrolledTooltip>
          </dt>
          <dd>{agentEntity.registeredProspects}</dd>
          <dt>
            <span id="activatedProspects">
              <Translate contentKey="prospectServiceApp.agent.activatedProspects">Activated Prospects</Translate>
            </span>
            <UncontrolledTooltip target="activatedProspects">
              <Translate contentKey="prospectServiceApp.agent.help.activatedProspects" />
            </UncontrolledTooltip>
          </dt>
          <dd>{agentEntity.activatedProspects}</dd>
          <dt>
            <span id="inPipeline">
              <Translate contentKey="prospectServiceApp.agent.inPipeline">In Pipeline</Translate>
            </span>
            <UncontrolledTooltip target="inPipeline">
              <Translate contentKey="prospectServiceApp.agent.help.inPipeline" />
            </UncontrolledTooltip>
          </dt>
          <dd>{agentEntity.inPipeline}</dd>
          <dt>
            <span id="lastRegistration">
              <Translate contentKey="prospectServiceApp.agent.lastRegistration">Last Registration</Translate>
            </span>
            <UncontrolledTooltip target="lastRegistration">
              <Translate contentKey="prospectServiceApp.agent.help.lastRegistration" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {agentEntity.lastRegistration ? <TextFormat value={agentEntity.lastRegistration} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="prospectServiceApp.agent.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>{agentEntity.createdAt ? <TextFormat value={agentEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updatedAt">
              <Translate contentKey="prospectServiceApp.agent.updatedAt">Updated At</Translate>
            </span>
          </dt>
          <dd>{agentEntity.updatedAt ? <TextFormat value={agentEntity.updatedAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.agent.address">Address</Translate>
          </dt>
          <dd>{agentEntity.address ? agentEntity.address.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/agent" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/agent/${agentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ agent }: IRootState) => ({
  agentEntity: agent.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AgentDetail);
