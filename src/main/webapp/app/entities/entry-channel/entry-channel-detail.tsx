import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './entry-channel.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEntryChannelDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EntryChannelDetail = (props: IEntryChannelDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { entryChannelEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="entryChannelDetailsHeading">
          <Translate contentKey="prospectServiceApp.entryChannel.detail.title">EntryChannel</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{entryChannelEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="prospectServiceApp.entryChannel.name">Name</Translate>
            </span>
          </dt>
          <dd>{entryChannelEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="prospectServiceApp.entryChannel.description">Description</Translate>
            </span>
          </dt>
          <dd>{entryChannelEntity.description}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="prospectServiceApp.entryChannel.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>
            {entryChannelEntity.createdAt ? <TextFormat value={entryChannelEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedAt">
              <Translate contentKey="prospectServiceApp.entryChannel.updatedAt">Updated At</Translate>
            </span>
          </dt>
          <dd>
            {entryChannelEntity.updatedAt ? <TextFormat value={entryChannelEntity.updatedAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/entry-channel" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/entry-channel/${entryChannelEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ entryChannel }: IRootState) => ({
  entryChannelEntity: entryChannel.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EntryChannelDetail);
