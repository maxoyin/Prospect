import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAddress } from 'app/shared/model/address.model';
import { getEntities as getAddresses } from 'app/entities/address/address.reducer';
import { getEntity, updateEntity, createEntity, reset } from './guarantor.reducer';
import { IGuarantor } from 'app/shared/model/guarantor.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IGuarantorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GuarantorUpdate = (props: IGuarantorUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { guarantorEntity, addresses, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/guarantor');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getAddresses();
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
        ...guarantorEntity,
        ...values,
        adress: addresses.find(it => it.id.toString() === values.adressId.toString()),
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
          <h2 id="prospectServiceApp.guarantor.home.createOrEditLabel" data-cy="GuarantorCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.guarantor.home.createOrEditLabel">Create or edit a Guarantor</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : guarantorEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="guarantor-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="guarantor-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="lastNameLabel" for="guarantor-lastName">
                  <Translate contentKey="prospectServiceApp.guarantor.lastName">Last Name</Translate>
                </Label>
                <AvField id="guarantor-lastName" data-cy="lastName" type="text" name="lastName" />
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="guarantor-firstName">
                  <Translate contentKey="prospectServiceApp.guarantor.firstName">First Name</Translate>
                </Label>
                <AvField id="guarantor-firstName" data-cy="firstName" type="text" name="firstName" />
              </AvGroup>
              <AvGroup>
                <Label id="otherNamesLabel" for="guarantor-otherNames">
                  <Translate contentKey="prospectServiceApp.guarantor.otherNames">Other Names</Translate>
                </Label>
                <AvField id="guarantor-otherNames" data-cy="otherNames" type="text" name="otherNames" />
              </AvGroup>
              <AvGroup>
                <Label id="genderLabel" for="guarantor-gender">
                  <Translate contentKey="prospectServiceApp.guarantor.gender">Gender</Translate>
                </Label>
                <AvInput
                  id="guarantor-gender"
                  data-cy="gender"
                  type="select"
                  className="form-control"
                  name="gender"
                  value={(!isNew && guarantorEntity.gender) || 'Male'}
                >
                  <option value="Male">{translate('prospectServiceApp.Gender.Male')}</option>
                  <option value="Female">{translate('prospectServiceApp.Gender.Female')}</option>
                  <option value="Others">{translate('prospectServiceApp.Gender.Others')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="guarantor-email">
                  <Translate contentKey="prospectServiceApp.guarantor.email">Email</Translate>
                </Label>
                <AvField id="guarantor-email" data-cy="email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneLabel" for="guarantor-phone">
                  <Translate contentKey="prospectServiceApp.guarantor.phone">Phone</Translate>
                </Label>
                <AvField id="guarantor-phone" data-cy="phone" type="text" name="phone" />
              </AvGroup>
              <AvGroup>
                <Label id="alternatePhoneLabel" for="guarantor-alternatePhone">
                  <Translate contentKey="prospectServiceApp.guarantor.alternatePhone">Alternate Phone</Translate>
                </Label>
                <AvField id="guarantor-alternatePhone" data-cy="alternatePhone" type="text" name="alternatePhone" />
              </AvGroup>
              <AvGroup>
                <Label id="bvnLabel" for="guarantor-bvn">
                  <Translate contentKey="prospectServiceApp.guarantor.bvn">Bvn</Translate>
                </Label>
                <AvField id="guarantor-bvn" data-cy="bvn" type="text" name="bvn" />
              </AvGroup>
              <AvGroup>
                <Label id="createdAtLabel" for="guarantor-createdAt">
                  <Translate contentKey="prospectServiceApp.guarantor.createdAt">Created At</Translate>
                </Label>
                <AvInput
                  id="guarantor-createdAt"
                  data-cy="createdAt"
                  type="datetime-local"
                  className="form-control"
                  name="createdAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.guarantorEntity.createdAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedAtLabel" for="guarantor-updatedAt">
                  <Translate contentKey="prospectServiceApp.guarantor.updatedAt">Updated At</Translate>
                </Label>
                <AvInput
                  id="guarantor-updatedAt"
                  data-cy="updatedAt"
                  type="datetime-local"
                  className="form-control"
                  name="updatedAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.guarantorEntity.updatedAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="guarantor-adress">
                  <Translate contentKey="prospectServiceApp.guarantor.adress">Adress</Translate>
                </Label>
                <AvInput id="guarantor-adress" data-cy="adress" type="select" className="form-control" name="adressId">
                  <option value="" key="0" />
                  {addresses
                    ? addresses.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/guarantor" replace color="info">
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
  addresses: storeState.address.entities,
  guarantorEntity: storeState.guarantor.entity,
  loading: storeState.guarantor.loading,
  updating: storeState.guarantor.updating,
  updateSuccess: storeState.guarantor.updateSuccess,
});

const mapDispatchToProps = {
  getAddresses,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GuarantorUpdate);
