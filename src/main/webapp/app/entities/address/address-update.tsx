import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './address.reducer';
import { IAddress } from 'app/shared/model/address.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAddressUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AddressUpdate = (props: IAddressUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { addressEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/address');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updatedAt = convertDateTimeToServer(values.updatedAt);

    if (errors.length === 0) {
      const entity = {
        ...addressEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="prospectServiceApp.address.home.createOrEditLabel" data-cy="AddressCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.address.home.createOrEditLabel">Create or edit a Address</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : addressEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="address-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="address-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="numberLabel" for="address-number">
                  <Translate contentKey="prospectServiceApp.address.number">Number</Translate>
                </Label>
                <AvField id="address-number" data-cy="number" type="text" name="number" />
              </AvGroup>
              <AvGroup>
                <Label id="streetLabel" for="address-street">
                  <Translate contentKey="prospectServiceApp.address.street">Street</Translate>
                </Label>
                <AvField id="address-street" data-cy="street" type="text" name="street" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="address-city">
                  <Translate contentKey="prospectServiceApp.address.city">City</Translate>
                </Label>
                <AvField id="address-city" data-cy="city" type="text" name="city" />
              </AvGroup>
              <AvGroup>
                <Label id="stateLabel" for="address-state">
                  <Translate contentKey="prospectServiceApp.address.state">State</Translate>
                </Label>
                <AvField id="address-state" data-cy="state" type="text" name="state" />
              </AvGroup>
              <AvGroup>
                <Label id="countryNameLabel" for="address-countryName">
                  <Translate contentKey="prospectServiceApp.address.countryName">Country Name</Translate>
                </Label>
                <AvField id="address-countryName" data-cy="countryName" type="text" name="countryName" />
              </AvGroup>
              <AvGroup>
                <Label id="countryCodeLabel" for="address-countryCode">
                  <Translate contentKey="prospectServiceApp.address.countryCode">Country Code</Translate>
                </Label>
                <AvField id="address-countryCode" data-cy="countryCode" type="text" name="countryCode" />
              </AvGroup>
              <AvGroup>
                <Label id="createdAtLabel" for="address-createdAt">
                  <Translate contentKey="prospectServiceApp.address.createdAt">Created At</Translate>
                </Label>
                <AvInput
                  id="address-createdAt"
                  data-cy="createdAt"
                  type="datetime-local"
                  className="form-control"
                  name="createdAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.addressEntity.createdAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedAtLabel" for="address-updatedAt">
                  <Translate contentKey="prospectServiceApp.address.updatedAt">Updated At</Translate>
                </Label>
                <AvInput
                  id="address-updatedAt"
                  data-cy="updatedAt"
                  type="datetime-local"
                  className="form-control"
                  name="updatedAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.addressEntity.updatedAt)}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/address" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  addressEntity: storeState.address.entity,
  loading: storeState.address.loading,
  updating: storeState.address.updating,
  updateSuccess: storeState.address.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddressUpdate);
