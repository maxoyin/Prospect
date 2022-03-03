import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './guarantor.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGuarantorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GuarantorDetail = (props: IGuarantorDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { guarantorEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="guarantorDetailsHeading">
          <Translate contentKey="prospectServiceApp.guarantor.detail.title">Guarantor</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.id}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="prospectServiceApp.guarantor.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.lastName}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="prospectServiceApp.guarantor.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.firstName}</dd>
          <dt>
            <span id="otherNames">
              <Translate contentKey="prospectServiceApp.guarantor.otherNames">Other Names</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.otherNames}</dd>
          <dt>
            <span id="gender">
              <Translate contentKey="prospectServiceApp.guarantor.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.gender}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="prospectServiceApp.guarantor.email">Email</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.email}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="prospectServiceApp.guarantor.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.phone}</dd>
          <dt>
            <span id="alternatePhone">
              <Translate contentKey="prospectServiceApp.guarantor.alternatePhone">Alternate Phone</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.alternatePhone}</dd>
          <dt>
            <span id="bvn">
              <Translate contentKey="prospectServiceApp.guarantor.bvn">Bvn</Translate>
            </span>
          </dt>
          <dd>{guarantorEntity.bvn}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="prospectServiceApp.guarantor.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>
            {guarantorEntity.createdAt ? <TextFormat value={guarantorEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="updatedAt">
              <Translate contentKey="prospectServiceApp.guarantor.updatedAt">Updated At</Translate>
            </span>
          </dt>
          <dd>
            {guarantorEntity.updatedAt ? <TextFormat value={guarantorEntity.updatedAt} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <Translate contentKey="prospectServiceApp.guarantor.adress">Adress</Translate>
          </dt>
          <dd>{guarantorEntity.adress ? guarantorEntity.adress.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/guarantor" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/guarantor/${guarantorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ guarantor }: IRootState) => ({
  guarantorEntity: guarantor.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GuarantorDetail);
