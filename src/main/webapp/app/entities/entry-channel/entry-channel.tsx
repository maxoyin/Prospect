// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './entry-channel.reducer';
import { IEntryChannel } from 'app/shared/model/entry-channel.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEntryChannelProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EntryChannel = (props: IEntryChannelProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { entryChannelList, match, loading } = props;
  return (
    <div>
      <h2 id="entry-channel-heading" data-cy="EntryChannelHeading">
        <Translate contentKey="prospectServiceApp.entryChannel.home.title">Entry Channels</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="prospectServiceApp.entryChannel.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="prospectServiceApp.entryChannel.home.createLabel">Create new Entry Channel</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {entryChannelList && entryChannelList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="prospectServiceApp.entryChannel.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.entryChannel.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.entryChannel.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.entryChannel.createdAt">Created At</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.entryChannel.updatedAt">Updated At</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {entryChannelList.map((entryChannel, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${entryChannel.id}`} color="link" size="sm">
                      {entryChannel.id}
                    </Button>
                  </td>
                  <td>{entryChannel.name}</td>
                  <td>{entryChannel.description}</td>
                  <td>
                    {entryChannel.createdAt ? <TextFormat type="date" value={entryChannel.createdAt} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {entryChannel.updatedAt ? <TextFormat type="date" value={entryChannel.updatedAt} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${entryChannel.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${entryChannel.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${entryChannel.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
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
              <Translate contentKey="prospectServiceApp.entryChannel.home.notFound">No Entry Channels found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ entryChannel }: IRootState) => ({
  entryChannelList: entryChannel.entities,
  loading: entryChannel.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EntryChannel);
