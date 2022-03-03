import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './entry-channel.reducer';
import { IEntryChannel } from 'app/shared/model/entry-channel.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEntryChannelUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EntryChannelUpdate = (props: IEntryChannelUpdateProps) => {
  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const { entryChannelEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/entry-channel');
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
        ...entryChannelEntity,
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
          <h2 id="prospectServiceApp.entryChannel.home.createOrEditLabel" data-cy="EntryChannelCreateUpdateHeading">
            <Translate contentKey="prospectServiceApp.entryChannel.home.createOrEditLabel">Create or edit a EntryChannel</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : entryChannelEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="entry-channel-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="entry-channel-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="entry-channel-name">
                  <Translate contentKey="prospectServiceApp.entryChannel.name">Name</Translate>
                </Label>
                <AvField id="entry-channel-name" data-cy="name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="entry-channel-description">
                  <Translate contentKey="prospectServiceApp.entryChannel.description">Description</Translate>
                </Label>
                <AvField id="entry-channel-description" data-cy="description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="createdAtLabel" for="entry-channel-createdAt">
                  <Translate contentKey="prospectServiceApp.entryChannel.createdAt">Created At</Translate>
                </Label>
                <AvInput
                  id="entry-channel-createdAt"
                  data-cy="createdAt"
                  type="datetime-local"
                  className="form-control"
                  name="createdAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.entryChannelEntity.createdAt)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="updatedAtLabel" for="entry-channel-updatedAt">
                  <Translate contentKey="prospectServiceApp.entryChannel.updatedAt">Updated At</Translate>
                </Label>
                <AvInput
                  id="entry-channel-updatedAt"
                  data-cy="updatedAt"
                  type="datetime-local"
                  className="form-control"
                  name="updatedAt"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.entryChannelEntity.updatedAt)}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/entry-channel" replace color="info">
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
  entryChannelEntity: storeState.entryChannel.entity,
  loading: storeState.entryChannel.loading,
  updating: storeState.entryChannel.updating,
  updateSuccess: storeState.entryChannel.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EntryChannelUpdate);
