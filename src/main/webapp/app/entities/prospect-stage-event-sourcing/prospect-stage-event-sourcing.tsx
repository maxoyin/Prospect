// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './prospect-stage-event-sourcing.reducer';
import { IProspectStageEventSourcing } from 'app/shared/model/prospect-stage-event-sourcing.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProspectStageEventSourcingProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ProspectStageEventSourcing = (props: IProspectStageEventSourcingProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { prospectStageEventSourcingList, match, loading } = props;
  return (
    <div>
      <h2 id="prospect-stage-event-sourcing-heading" data-cy="ProspectStageEventSourcingHeading">
        <Translate contentKey="prospectServiceApp.prospectStageEventSourcing.home.title">Prospect Stage Event Sourcings</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="prospectServiceApp.prospectStageEventSourcing.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="prospectServiceApp.prospectStageEventSourcing.home.createLabel">
              Create new Prospect Stage Event Sourcing
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {prospectStageEventSourcingList && prospectStageEventSourcingList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="prospectServiceApp.prospectStageEventSourcing.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.prospectStageEventSourcing.createdAt">Created At</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.prospectStageEventSourcing.propsectId">Propsect Id</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.prospectStageEventSourcing.event">Event</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.prospectStageEventSourcing.payload">Payload</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {prospectStageEventSourcingList.map((prospectStageEventSourcing, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${prospectStageEventSourcing.id}`} color="link" size="sm">
                      {prospectStageEventSourcing.id}
                    </Button>
                  </td>
                  <td>
                    {prospectStageEventSourcing.createdAt ? (
                      <TextFormat type="date" value={prospectStageEventSourcing.createdAt} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{prospectStageEventSourcing.propsectId}</td>
                  <td>{prospectStageEventSourcing.event}</td>
                  <td>{prospectStageEventSourcing.payload}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${prospectStageEventSourcing.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${prospectStageEventSourcing.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${prospectStageEventSourcing.id}/delete`}
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
              <Translate contentKey="prospectServiceApp.prospectStageEventSourcing.home.notFound">
                No Prospect Stage Event Sourcings found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ prospectStageEventSourcing }: IRootState) => ({
  prospectStageEventSourcingList: prospectStageEventSourcing.entities,
  loading: prospectStageEventSourcing.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProspectStageEventSourcing);
