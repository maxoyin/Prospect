import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProspectStageEventSourcing, defaultValue } from 'app/shared/model/prospect-stage-event-sourcing.model';

export const ACTION_TYPES = {
  FETCH_PROSPECTSTAGEEVENTSOURCING_LIST: 'prospectStageEventSourcing/FETCH_PROSPECTSTAGEEVENTSOURCING_LIST',
  FETCH_PROSPECTSTAGEEVENTSOURCING: 'prospectStageEventSourcing/FETCH_PROSPECTSTAGEEVENTSOURCING',
  CREATE_PROSPECTSTAGEEVENTSOURCING: 'prospectStageEventSourcing/CREATE_PROSPECTSTAGEEVENTSOURCING',
  UPDATE_PROSPECTSTAGEEVENTSOURCING: 'prospectStageEventSourcing/UPDATE_PROSPECTSTAGEEVENTSOURCING',
  PARTIAL_UPDATE_PROSPECTSTAGEEVENTSOURCING: 'prospectStageEventSourcing/PARTIAL_UPDATE_PROSPECTSTAGEEVENTSOURCING',
  DELETE_PROSPECTSTAGEEVENTSOURCING: 'prospectStageEventSourcing/DELETE_PROSPECTSTAGEEVENTSOURCING',
  RESET: 'prospectStageEventSourcing/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProspectStageEventSourcing>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ProspectStageEventSourcingState = Readonly<typeof initialState>;

// Reducer

export default (state: ProspectStageEventSourcingState = initialState, action): ProspectStageEventSourcingState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROSPECTSTAGEEVENTSOURCING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROSPECTSTAGEEVENTSOURCING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PROSPECTSTAGEEVENTSOURCING):
    case REQUEST(ACTION_TYPES.UPDATE_PROSPECTSTAGEEVENTSOURCING):
    case REQUEST(ACTION_TYPES.DELETE_PROSPECTSTAGEEVENTSOURCING):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_PROSPECTSTAGEEVENTSOURCING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PROSPECTSTAGEEVENTSOURCING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROSPECTSTAGEEVENTSOURCING):
    case FAILURE(ACTION_TYPES.CREATE_PROSPECTSTAGEEVENTSOURCING):
    case FAILURE(ACTION_TYPES.UPDATE_PROSPECTSTAGEEVENTSOURCING):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_PROSPECTSTAGEEVENTSOURCING):
    case FAILURE(ACTION_TYPES.DELETE_PROSPECTSTAGEEVENTSOURCING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROSPECTSTAGEEVENTSOURCING_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROSPECTSTAGEEVENTSOURCING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROSPECTSTAGEEVENTSOURCING):
    case SUCCESS(ACTION_TYPES.UPDATE_PROSPECTSTAGEEVENTSOURCING):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_PROSPECTSTAGEEVENTSOURCING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROSPECTSTAGEEVENTSOURCING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/prospect-stage-event-sourcings';

// Actions

export const getEntities: ICrudGetAllAction<IProspectStageEventSourcing> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROSPECTSTAGEEVENTSOURCING_LIST,
  payload: axios.get<IProspectStageEventSourcing>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IProspectStageEventSourcing> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROSPECTSTAGEEVENTSOURCING,
    payload: axios.get<IProspectStageEventSourcing>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProspectStageEventSourcing> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROSPECTSTAGEEVENTSOURCING,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProspectStageEventSourcing> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROSPECTSTAGEEVENTSOURCING,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IProspectStageEventSourcing> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_PROSPECTSTAGEEVENTSOURCING,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProspectStageEventSourcing> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROSPECTSTAGEEVENTSOURCING,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
