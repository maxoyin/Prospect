// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './onboarding-stage.reducer';
import { IOnboardingStage } from 'app/shared/model/onboarding-stage.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOnboardingStageProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const OnboardingStage = (props: IOnboardingStageProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const handleSyncList = () => {
    props.getEntities();
  };

  const { onboardingStageList, match, loading } = props;
  return (
    <div>
      <h2 id="onboarding-stage-heading" data-cy="OnboardingStageHeading">
        <Translate contentKey="prospectServiceApp.onboardingStage.home.title">Onboarding Stages</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="prospectServiceApp.onboardingStage.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="prospectServiceApp.onboardingStage.home.createLabel">Create new Onboarding Stage</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {onboardingStageList && onboardingStageList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="prospectServiceApp.onboardingStage.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.onboardingStage.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.onboardingStage.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.onboardingStage.rank">Rank</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.onboardingStage.createdAt">Created At</Translate>
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.onboardingStage.updatedAt">Updated At</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {onboardingStageList.map((onboardingStage, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${onboardingStage.id}`} color="link" size="sm">
                      {onboardingStage.id}
                    </Button>
                  </td>
                  <td>{onboardingStage.name}</td>
                  <td>{onboardingStage.description}</td>
                  <td>{onboardingStage.rank}</td>
                  <td>
                    {onboardingStage.createdAt ? (
                      <TextFormat type="date" value={onboardingStage.createdAt} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {onboardingStage.updatedAt ? (
                      <TextFormat type="date" value={onboardingStage.updatedAt} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${onboardingStage.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${onboardingStage.id}/edit`}
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
                        to={`${match.url}/${onboardingStage.id}/delete`}
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
              <Translate contentKey="prospectServiceApp.onboardingStage.home.notFound">No Onboarding Stages found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ onboardingStage }: IRootState) => ({
  onboardingStageList: onboardingStage.entities,
  loading: onboardingStage.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStage);
