import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProspect } from 'app/shared/model/prospect.model';
import { getEntities as getProspects } from 'app/entities/prospect/prospect.reducer';
import { getEntity, updateEntity, createEntity, reset } from './asset-type.reducer';
import { IAssetType } from 'app/shared/model/asset-type.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAssetTypeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AssetTypeUpdate = (props: IAssetTypeUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { assetTypeEntity, prospects, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/asset-type');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProspects();
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
        ...assetTypeEntity,
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
          <h2 id="prospectServiceApp.assetType.home.createOrEditLabel" data-cy="AssetTypeCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.assetType.home.createOrEditLabel">Create or edit a AssetType</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : assetTypeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="asset-type-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="asset-type-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="asset-type-name">
                  <Translate contentKey="prospectServiceApp.assetType.name">Name</Translate>
                </Label>
                <AvField id="asset-type-name" data-cy="name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="asset-type-description">
                  <Translate contentKey="prospectServiceApp.assetType.description">Description</Translate>
                </Label>
                <AvField id="asset-type-description" data-cy="description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="createdAtLabel" for="asset-type-createdAt">
                  <Translate contentKey="prospectServiceApp.assetType.createdAt">Created At</Translate>
                </Label>
                <AvInput
                  id="asset-type-createdAt"
                  data-cy="createdAt"
                  type="datetime-local"
                  className="form-control"
                  name="createdAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.assetTypeEntity.createdAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedAtLabel" for="asset-type-updatedAt">
                  <Translate contentKey="prospectServiceApp.assetType.updatedAt">Updated At</Translate>
                </Label>
                <AvInput
                  id="asset-type-updatedAt"
                  data-cy="updatedAt"
                  type="datetime-local"
                  className="form-control"
                  name="updatedAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.assetTypeEntity.updatedAt)}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/asset-type" replace color="info">
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
  prospects: storeState.prospect.entities,
  assetTypeEntity: storeState.assetType.entity,
  loading: storeState.assetType.loading,
  updating: storeState.assetType.updating,
  updateSuccess: storeState.assetType.updateSuccess,
});

const mapDispatchToProps = {
  getProspects,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AssetTypeUpdate);
