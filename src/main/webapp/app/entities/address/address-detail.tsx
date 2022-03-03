import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './address.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAddressDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AddressDetail = (props: IAddressDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { addressEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="addressDetailsHeading">
          <Translate contentKey="prospectServiceApp.address.detail.title">Address</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{addressEntity.id}</dd>
          <dt>
            <span id="number">
              <Translate contentKey="prospectServiceApp.address.number">Number</Translate>
            </span>
          </dt>
          <dd>{addressEntity.number}</dd>
          <dt>
            <span id="street">
              <Translate contentKey="prospectServiceApp.address.street">Street</Translate>
            </span>
          </dt>
          <dd>{addressEntity.street}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="prospectServiceApp.address.city">City</Translate>
            </span>
          </dt>
          <dd>{addressEntity.city}</dd>
          <dt>
            <span id="state">
              <Translate contentKey="prospectServiceApp.address.state">State</Translate>
            </span>
          </dt>
          <dd>{addressEntity.state}</dd>
          <dt>
            <span id="countryName">
              <Translate contentKey="prospectServiceApp.address.countryName">Country Name</Translate>
            </span>
          </dt>
          <dd>{addressEntity.countryName}</dd>
          <dt>
            <span id="countryCode">
              <Translate contentKey="prospectServiceApp.address.countryCode">Country Code</Translate>
            </span>
          </dt>
          <dd>{addressEntity.countryCode}</dd>
          <dt>
            <span id="createdAt">
              <Translate contentKey="prospectServiceApp.address.createdAt">Created At</Translate>
            </span>
          </dt>
          <dd>{addressEntity.createdAt ? <TextFormat value={addressEntity.createdAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="updatedAt">
              <Translate contentKey="prospectServiceApp.address.updatedAt">Updated At</Translate>
            </span>
          </dt>
          <dd>{addressEntity.updatedAt ? <TextFormat value={addressEntity.updatedAt} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
        </dl>
        <Button tag={Link} to="/address" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/address/${addressEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ address }: IRootState) => ({
  addressEntity: address.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetail);
