import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProspect, defaultValue } from 'app/shared/model/prospect.model';

export const ACTION_TYPES = {
  FETCH_PROSPECT_LIST: 'prospect/FETCH_PROSPECT_LIST',
  FETCH_PROSPECT: 'prospect/FETCH_PROSPECT',
  CREATE_PROSPECT: 'prospect/CREATE_PROSPECT',
  UPDATE_PROSPECT: 'prospect/UPDATE_PROSPECT',
  PARTIAL_UPDATE_PROSPECT: 'prospect/PARTIAL_UPDATE_PROSPECT',
  DELETE_PROSPECT: 'prospect/DELETE_PROSPECT',
  RESET: 'prospect/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProspect>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ProspectState = Readonly<typeof initialState>;

// Reducer

export default (state: ProspectState = initialState, action): ProspectState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROSPECT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROSPECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PROSPECT):
    case REQUEST(ACTION_TYPES.UPDATE_PROSPECT):
    case REQUEST(ACTION_TYPES.DELETE_PROSPECT):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_PROSPECT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PROSPECT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROSPECT):
    case FAILURE(ACTION_TYPES.CREATE_PROSPECT):
    case FAILURE(ACTION_TYPES.UPDATE_PROSPECT):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_PROSPECT):
    case FAILURE(ACTION_TYPES.DELETE_PROSPECT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROSPECT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROSPECT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROSPECT):
    case SUCCESS(ACTION_TYPES.UPDATE_PROSPECT):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_PROSPECT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROSPECT):
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

const apiUrl = 'api/prospects';

// Actions

export const getEntities: ICrudGetAllAction<IProspect> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PROSPECT_LIST,
    payload: axios.get<IProspect>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IProspect> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROSPECT,
    payload: axios.get<IProspect>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProspect> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROSPECT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProspect> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROSPECT,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IProspect> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_PROSPECT,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProspect> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROSPECT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
