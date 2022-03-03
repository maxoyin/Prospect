// removed th id primary key
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './prospect.reducer';
import { IProspect } from 'app/shared/model/prospect.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IProspectProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Prospect = (props: IProspectProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  const { prospectList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="prospect-heading" data-cy="ProspectHeading">
        <Translate contentKey="prospectServiceApp.prospect.home.title">Prospects</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="prospectServiceApp.prospect.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="prospectServiceApp.prospect.home.createLabel">Create new Prospect</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {prospectList && prospectList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="prospectServiceApp.prospect.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('prospectiveId')}>
                  <Translate contentKey="prospectServiceApp.prospect.prospectiveId">Prospective Id</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lastName')}>
                  <Translate contentKey="prospectServiceApp.prospect.lastName">Last Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('firstName')}>
                  <Translate contentKey="prospectServiceApp.prospect.firstName">First Name</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('otherNames')}>
                  <Translate contentKey="prospectServiceApp.prospect.otherNames">Other Names</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateOfBirth')}>
                  <Translate contentKey="prospectServiceApp.prospect.dateOfBirth">Date Of Birth</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('gender')}>
                  <Translate contentKey="prospectServiceApp.prospect.gender">Gender</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('email')}>
                  <Translate contentKey="prospectServiceApp.prospect.email">Email</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('phone')}>
                  <Translate contentKey="prospectServiceApp.prospect.phone">Phone</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('alternatePhone')}>
                  <Translate contentKey="prospectServiceApp.prospect.alternatePhone">Alternate Phone</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('disabilities')}>
                  <Translate contentKey="prospectServiceApp.prospect.disabilities">Disabilities</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('bvn')}>
                  <Translate contentKey="prospectServiceApp.prospect.bvn">Bvn</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('bvnAddress')}>
                  <Translate contentKey="prospectServiceApp.prospect.bvnAddress">Bvn Address</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('isBvnVerified')}>
                  <Translate contentKey="prospectServiceApp.prospect.isBvnVerified">Is Bvn Verified</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('bvnInformation')}>
                  <Translate contentKey="prospectServiceApp.prospect.bvnInformation">Bvn Information</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('driversLicenseNumber')}>
                  <Translate contentKey="prospectServiceApp.prospect.driversLicenseNumber">Drivers License Number</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('driversLicenseExpiry')}>
                  <Translate contentKey="prospectServiceApp.prospect.driversLicenseExpiry">Drivers License Expiry</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dateAvailableForTest')}>
                  <Translate contentKey="prospectServiceApp.prospect.dateAvailableForTest">Date Available For Test</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('photoUrl')}>
                  <Translate contentKey="prospectServiceApp.prospect.photoUrl">Photo Url</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('noShowCount')}>
                  <Translate contentKey="prospectServiceApp.prospect.noShowCount">No Show Count</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('activated')}>
                  <Translate contentKey="prospectServiceApp.prospect.activated">Activated</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('inRecovery')}>
                  <Translate contentKey="prospectServiceApp.prospect.inRecovery">In Recovery</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('retrain')}>
                  <Translate contentKey="prospectServiceApp.prospect.retrain">Retrain</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('createdAt')}>
                  <Translate contentKey="prospectServiceApp.prospect.createdAt">Created At</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('updatedAt')}>
                  <Translate contentKey="prospectServiceApp.prospect.updatedAt">Updated At</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.prospect.address">Address</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.prospect.onboardingStage">Onboarding Stage</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.prospect.location">Location</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.prospect.agent">Agent</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="prospectServiceApp.prospect.entryChannel">Entry Channel</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {prospectList.map((prospect, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${prospect.id}`} color="link" size="sm">
                      {prospect.id}
                    </Button>
                  </td>
                  <td>{prospect.prospectiveId}</td>
                  <td>{prospect.lastName}</td>
                  <td>{prospect.firstName}</td>
                  <td>{prospect.otherNames}</td>
                  <td>{prospect.dateOfBirth ? <TextFormat type="date" value={prospect.dateOfBirth} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>
                    <Translate contentKey={`prospectServiceApp.Gender.${prospect.gender}`} />
                  </td>
                  <td>{prospect.email}</td>
                  <td>{prospect.phone}</td>
                  <td>{prospect.alternatePhone}</td>
                  <td>{prospect.disabilities}</td>
                  <td>{prospect.bvn}</td>
                  <td>{prospect.bvnAddress}</td>
                  <td>{prospect.isBvnVerified ? 'true' : 'false'}</td>
                  <td>{prospect.bvnInformation}</td>
                  <td>{prospect.driversLicenseNumber}</td>
                  <td>
                    {prospect.driversLicenseExpiry ? (
                      <TextFormat type="date" value={prospect.driversLicenseExpiry} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {prospect.dateAvailableForTest ? (
                      <TextFormat type="date" value={prospect.dateAvailableForTest} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{prospect.photoUrl}</td>
                  <td>{prospect.noShowCount}</td>
                  <td>{prospect.activated ? 'true' : 'false'}</td>
                  <td>{prospect.inRecovery ? 'true' : 'false'}</td>
                  <td>{prospect.retrain ? 'true' : 'false'}</td>
                  <td>{prospect.createdAt ? <TextFormat type="date" value={prospect.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{prospect.updatedAt ? <TextFormat type="date" value={prospect.updatedAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{prospect.address ? <Link to={`address/${prospect.address.id}`}>{prospect.address.id}</Link> : ''}</td>
                  <td>
                    {prospect.onboardingStage ? (
                      <Link to={`onboarding-stage/${prospect.onboardingStage.id}`}>{prospect.onboardingStage.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{prospect.location ? <Link to={`location/${prospect.location.id}`}>{prospect.location.id}</Link> : ''}</td>
                  <td>{prospect.agent ? <Link to={`agent/${prospect.agent.id}`}>{prospect.agent.id}</Link> : ''}</td>
                  <td>
                    {prospect.entryChannel ? <Link to={`entry-channel/${prospect.entryChannel.id}`}>{prospect.entryChannel.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${prospect.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${prospect.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${prospect.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
              <Translate contentKey="prospectServiceApp.prospect.home.notFound">No Prospects found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={prospectList && prospectList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({ prospect }: IRootState) => ({
  prospectList: prospect.entities,
  loading: prospect.loading,
  totalItems: prospect.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Prospect);
