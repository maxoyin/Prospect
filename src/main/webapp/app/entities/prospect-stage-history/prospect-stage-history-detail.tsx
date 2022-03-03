import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './prospect-stage-history.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProspectStageHistoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProspectStageHistoryDetail = (props: IProspectStageHistoryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { prospectStageHistoryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="prospectStageHistoryDetailsHeading">
          <Translate contentKey="prospectServiceApp.prospectStageHistory.detail.title">ProspectStageHistory</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{prospectStageHistoryEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="prospectServiceApp.prospectStageHistory.name">Name</Translate>
            </span>
          </dt>
          <dd>{prospectStageHistoryEntity.name}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="prospectServiceApp.prospectStageHistory.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>
            {prospectStageHistoryEntity.createdAt ? (
              <TextFormat value={prospectStageHistoryEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="prospectServiceApp.prospectStageHistory.fromStage">From Stage</Translate>
          </dt>
          <dd>{prospectStageHistoryEntity.fromStage ? prospectStageHistoryEntity.fromStage.id : ''}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.prospectStageHistory.toStage">To Stage</Translate>
          </dt>
          <dd>{prospectStageHistoryEntity.toStage ? prospectStageHistoryEntity.toStage.id : ''}</dd>
          <dt>
            <Translate contentKey="prospectServiceApp.prospectStageHistory.prospect">Prospect</Translate>
          </dt>
          <dd>{prospectStageHistoryEntity.prospect ? prospectStageHistoryEntity.prospect.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/prospect-stage-history" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/prospect-stage-history/${prospectStageHistoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ prospectStageHistory }: IRootState) => ({
  prospectStageHistoryEntity: prospectStageHistory.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProspectStageHistoryDetail);
