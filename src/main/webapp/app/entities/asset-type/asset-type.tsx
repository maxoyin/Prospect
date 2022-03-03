// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './asset-type.reducer';
import { IAssetType } from 'app/shared/model/asset-type.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAssetTypeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const AssetType = (props: IAssetTypeProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { assetTypeList, match, loading } = props;
  return (
    <div>
      <h2 id="asset-type-heading" data-cy="AssetTypeHeading">
        <Translate contentKey="prospectServiceApp.assetType.home.title">Asset Types</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="prospectServiceApp.assetType.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="prospectServiceApp.assetType.home.createLabel">Create new Asset Type</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {assetTypeList && assetTypeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="prospectServiceApp.assetType.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.assetType.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.assetType.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.assetType.createdAt">Created At</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.assetType.updatedAt">Updated At</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {assetTypeList.map((assetType, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${assetType.id}`} color="link" size="sm">
                      {assetType.id}
                    </Button>
                  </td>
                  <td>{assetType.name}</td>
                  <td>{assetType.description}</td>
                  <td>{assetType.createdAt ? <TextFormat type="date" value={assetType.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{assetType.updatedAt ? <TextFormat type="date" value={assetType.updatedAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${assetType.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${assetType.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${assetType.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="prospectServiceApp.assetType.home.notFound">No Asset Types found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ assetType }: IRootState) => ({
  assetTypeList: assetType.entities,
  loading: assetType.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AssetType);
