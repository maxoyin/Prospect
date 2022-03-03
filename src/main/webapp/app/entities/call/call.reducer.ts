import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICall, defaultValue } from 'app/shared/model/call.model';

export const ACTION_TYPES = {
  FETCH_CALL_LIST: 'call/FETCH_CALL_LIST',
  FETCH_CALL: 'call/FETCH_CALL',
  CREATE_CALL: 'call/CREATE_CALL',
  UPDATE_CALL: 'call/UPDATE_CALL',
  PARTIAL_UPDATE_CALL: 'call/PARTIAL_UPDATE_CALL',
  DELETE_CALL: 'call/DELETE_CALL',
  RESET: 'call/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICall>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type CallState = Readonly<typeof initialState>;

// Reducer

export default (state: CallState = initialState, action): CallState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CALL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CALL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_CALL):
    case REQUEST(ACTION_TYPES.UPDATE_CALL):
    case REQUEST(ACTION_TYPES.DELETE_CALL):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_CALL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_CALL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CALL):
    case FAILURE(ACTION_TYPES.CREATE_CALL):
    case FAILURE(ACTION_TYPES.UPDATE_CALL):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_CALL):
    case FAILURE(ACTION_TYPES.DELETE_CALL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CALL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_CALL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_CALL):
    case SUCCESS(ACTION_TYPES.UPDATE_CALL):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_CALL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_CALL):
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

const apiUrl = 'api/calls';

// Actions

export const getEntities: ICrudGetAllAction<ICall> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CALL_LIST,
  payload: axios.get<ICall>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ICall> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CALL,
    payload: axios.get<ICall>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICall> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CALL,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICall> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CALL,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<ICall> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_CALL,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICall> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CALL,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
