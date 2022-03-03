import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEntryChannel, defaultValue } from 'app/shared/model/entry-channel.model';

export const ACTION_TYPES = {
  FETCH_ENTRYCHANNEL_LIST: 'entryChannel/FETCH_ENTRYCHANNEL_LIST',
  FETCH_ENTRYCHANNEL: 'entryChannel/FETCH_ENTRYCHANNEL',
  CREATE_ENTRYCHANNEL: 'entryChannel/CREATE_ENTRYCHANNEL',
  UPDATE_ENTRYCHANNEL: 'entryChannel/UPDATE_ENTRYCHANNEL',
  PARTIAL_UPDATE_ENTRYCHANNEL: 'entryChannel/PARTIAL_UPDATE_ENTRYCHANNEL',
  DELETE_ENTRYCHANNEL: 'entryChannel/DELETE_ENTRYCHANNEL',
  RESET: 'entryChannel/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEntryChannel>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EntryChannelState = Readonly<typeof initialState>;

// Reducer

export default (state: EntryChannelState = initialState, action): EntryChannelState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ENTRYCHANNEL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ENTRYCHANNEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ENTRYCHANNEL):
    case REQUEST(ACTION_TYPES.UPDATE_ENTRYCHANNEL):
    case REQUEST(ACTION_TYPES.DELETE_ENTRYCHANNEL):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_ENTRYCHANNEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ENTRYCHANNEL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ENTRYCHANNEL):
    case FAILURE(ACTION_TYPES.CREATE_ENTRYCHANNEL):
    case FAILURE(ACTION_TYPES.UPDATE_ENTRYCHANNEL):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_ENTRYCHANNEL):
    case FAILURE(ACTION_TYPES.DELETE_ENTRYCHANNEL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENTRYCHANNEL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ENTRYCHANNEL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ENTRYCHANNEL):
    case SUCCESS(ACTION_TYPES.UPDATE_ENTRYCHANNEL):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_ENTRYCHANNEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ENTRYCHANNEL):
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

const apiUrl = 'api/entry-channels';

// Actions

export const getEntities: ICrudGetAllAction<IEntryChannel> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ENTRYCHANNEL_LIST,
  payload: axios.get<IEntryChannel>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEntryChannel> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ENTRYCHANNEL,
    payload: axios.get<IEntryChannel>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEntryChannel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ENTRYCHANNEL,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEntryChannel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ENTRYCHANNEL,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IEntryChannel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_ENTRYCHANNEL,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEntryChannel> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ENTRYCHANNEL,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
