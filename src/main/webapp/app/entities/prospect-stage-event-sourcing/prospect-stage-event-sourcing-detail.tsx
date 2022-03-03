import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './prospect-stage-event-sourcing.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProspectStageEventSourcingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProspectStageEventSourcingDetail = (props: IProspectStageEventSourcingDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { prospectStageEventSourcingEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="prospectStageEventSourcingDetailsHeading">
          <Translate contentKey="prospectServiceApp.prospectStageEventSourcing.detail.title">ProspectStageEventSourcing</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{prospectStageEventSourcingEntity.id}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="prospectServiceApp.prospectStageEventSourcing.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>
            {prospectStageEventSourcingEntity.createdAt ? (
              <TextFormat value={prospectStageEventSourcingEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="propsectId">
              <Translate contentKey="prospectServiceApp.prospectStageEventSourcing.propsectId">Propsect Id</Translate>
            </span>
          </dt>
          <dd>{prospectStageEventSourcingEntity.propsectId}</dd>
          <dt>
            <span id="event">
              <Translate contentKey="prospectServiceApp.prospectStageEventSourcing.event">Event</Translate>
            </span>
          </dt>
          <dd>{prospectStageEventSourcingEntity.event}</dd>
          <dt>
            <span id="payload">
              <Translate contentKey="prospectServiceApp.prospectStageEventSourcing.payload">Payload</Translate>
            </span>
          </dt>
          <dd>{prospectStageEventSourcingEntity.payload}</dd>
        </dl>
        <Button tag={Link} to="/prospect-stage-event-sourcing" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/prospect-stage-event-sourcing/${prospectStageEventSourcingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ prospectStageEventSourcing }: IRootState) => ({
  prospectStageEventSourcingEntity: prospectStageEventSourcing.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProspectStageEventSourcingDetail);
