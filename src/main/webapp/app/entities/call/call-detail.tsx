import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './call.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICallDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CallDetail = (props: ICallDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { callEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="callDetailsHeading">
          <Translate contentKey="prospectServiceApp.call.detail.title">Call</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{callEntity.id}</dd>
          <dt>
            <span id="comment">
              <Translate contentKey="prospectServiceApp.call.comment">Comment</Translate>
            </span>
          </dt>
          <dd>{callEntity.comment}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="prospectServiceApp.call.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>{callEntity.createdAt ? <TextFormat value={callEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.call.agent">Agent</Translate>
          </dt>
          <dd>{callEntity.agent ? callEntity.agent.id : ''}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.call.prospect">Prospect</Translate>
          </dt>
          <dd>{callEntity.prospect ? callEntity.prospect.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/call" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/call/${callEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ call }: IRootState) => ({
  callEntity: call.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CallDetail);
