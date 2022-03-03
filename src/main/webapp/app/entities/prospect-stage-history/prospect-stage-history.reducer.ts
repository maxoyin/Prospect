import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction,
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProspectStageHistory, defaultValue } from 'app/shared/model/prospect-stage-history.model';

export const ACTION_TYPES = {
  FETCH_PROSPECTSTAGEHISTORY_LIST: 'prospectStageHistory/FETCH_PROSPECTSTAGEHISTORY_LIST',
  FETCH_PROSPECTSTAGEHISTORY: 'prospectStageHistory/FETCH_PROSPECTSTAGEHISTORY',
  CREATE_PROSPECTSTAGEHISTORY: 'prospectStageHistory/CREATE_PROSPECTSTAGEHISTORY',
  UPDATE_PROSPECTSTAGEHISTORY: 'prospectStageHistory/UPDATE_PROSPECTSTAGEHISTORY',
  PARTIAL_UPDATE_PROSPECTSTAGEHISTORY: 'prospectStageHistory/PARTIAL_UPDATE_PROSPECTSTAGEHISTORY',
  DELETE_PROSPECTSTAGEHISTORY: 'prospectStageHistory/DELETE_PROSPECTSTAGEHISTORY',
  RESET: 'prospectStageHistory/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProspectStageHistory>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type ProspectStageHistoryState = Readonly<typeof initialState>;

// Reducer

export default (state: ProspectStageHistoryState = initialState, action): ProspectStageHistoryState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROSPECTSTAGEHISTORY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROSPECTSTAGEHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PROSPECTSTAGEHISTORY):
    case REQUEST(ACTION_TYPES.UPDATE_PROSPECTSTAGEHISTORY):
    case REQUEST(ACTION_TYPES.DELETE_PROSPECTSTAGEHISTORY):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_PROSPECTSTAGEHISTORY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PROSPECTSTAGEHISTORY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROSPECTSTAGEHISTORY):
    case FAILURE(ACTION_TYPES.CREATE_PROSPECTSTAGEHISTORY):
    case FAILURE(ACTION_TYPES.UPDATE_PROSPECTSTAGEHISTORY):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_PROSPECTSTAGEHISTORY):
    case FAILURE(ACTION_TYPES.DELETE_PROSPECTSTAGEHISTORY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROSPECTSTAGEHISTORY_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_PROSPECTSTAGEHISTORY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROSPECTSTAGEHISTORY):
    case SUCCESS(ACTION_TYPES.UPDATE_PROSPECTSTAGEHISTORY):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_PROSPECTSTAGEHISTORY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROSPECTSTAGEHISTORY):
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

const apiUrl = 'api/prospect-stage-histories';

// Actions

export const getEntities: ICrudGetAllAction<IProspectStageHistory> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PROSPECTSTAGEHISTORY_LIST,
    payload: axios.get<IProspectStageHistory>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IProspectStageHistory> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROSPECTSTAGEHISTORY,
    payload: axios.get<IProspectStageHistory>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProspectStageHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROSPECTSTAGEHISTORY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const updateEntity: ICrudPutAction<IProspectStageHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROSPECTSTAGEHISTORY,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IProspectStageHistory> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_PROSPECTSTAGEHISTORY,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProspectStageHistory> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROSPECTSTAGEHISTORY,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
