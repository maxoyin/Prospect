import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './asset-type.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAssetTypeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AssetTypeDetail = (props: IAssetTypeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { assetTypeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="assetTypeDetailsHeading">
          <Translate contentKey="prospectServiceApp.assetType.detail.title">AssetType</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{assetTypeEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="prospectServiceApp.assetType.name">Name</Translate>
            </span>
          </dt>
          <dd>{assetTypeEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="prospectServiceApp.assetType.description">Description</Translate>
            </span>
          </dt>
          <dd>{assetTypeEntity.description}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="prospectServiceApp.assetType.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>
            {assetTypeEntity.createdAt ? <TextFormat value={assetTypeEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedAt">
              <Translate contentKey="prospectServiceApp.assetType.updatedAt">Updated At</Translate>
            </span>
          </dt>
          <dd>
            {assetTypeEntity.updatedAt ? <TextFormat value={assetTypeEntity.updatedAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
        </dl>
        <Button tag={Link} to="/asset-type" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/asset-type/${assetTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ assetType }: IRootState) => ({
  assetTypeEntity: assetType.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AssetTypeDetail);
