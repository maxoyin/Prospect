// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './call.reducer';
import { ICall } from 'app/shared/model/call.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICallProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Call = (props: ICallProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { callList, match, loading } = props;
  return (
    <div>
      <h2 id="call-heading" data-cy="CallHeading">
        <Translate contentKey="prospectServiceApp.call.home.title">Calls</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="prospectServiceApp.call.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="prospectServiceApp.call.home.createLabel">Create new Call</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {callList && callList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="prospectServiceApp.call.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.call.comment">Comment</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.call.createdAt">Created At</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.call.agent">Agent</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.call.prospect">Prospect</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {callList.map((call, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${call.id}`} color="link" size="sm">
                      {call.id}
                    </Button>
                  </td>
                  <td>{call.comment}</td>
                  <td>{call.createdAt ? <TextFormat type="date" value={call.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{call.agent ? <Link to={`agent/${call.agent.id}`}>{call.agent.id}</Link> : ''}</td>
                  <td>{call.prospect ? <Link to={`prospect/${call.prospect.id}`}>{call.prospect.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${call.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${call.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${call.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="prospectServiceApp.call.home.notFound">No Calls found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ call }: IRootState) => ({
  callList: call.entities,
  loading: call.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Call);
