import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOnboardingStage, defaultValue } from 'app/shared/model/onboarding-stage.model';

export const ACTION_TYPES = {
  FETCH_ONBOARDINGSTAGE_LIST: 'onboardingStage/FETCH_ONBOARDINGSTAGE_LIST',
  FETCH_ONBOARDINGSTAGE: 'onboardingStage/FETCH_ONBOARDINGSTAGE',
  CREATE_ONBOARDINGSTAGE: 'onboardingStage/CREATE_ONBOARDINGSTAGE',
  UPDATE_ONBOARDINGSTAGE: 'onboardingStage/UPDATE_ONBOARDINGSTAGE',
  PARTIAL_UPDATE_ONBOARDINGSTAGE: 'onboardingStage/PARTIAL_UPDATE_ONBOARDINGSTAGE',
  DELETE_ONBOARDINGSTAGE: 'onboardingStage/DELETE_ONBOARDINGSTAGE',
  RESET: 'onboardingStage/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOnboardingStage>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type OnboardingStageState = Readonly<typeof initialState>;

// Reducer

export default (state: OnboardingStageState = initialState, action): OnboardingStageState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ONBOARDINGSTAGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ONBOARDINGSTAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ONBOARDINGSTAGE):
    case REQUEST(ACTION_TYPES.UPDATE_ONBOARDINGSTAGE):
    case REQUEST(ACTION_TYPES.DELETE_ONBOARDINGSTAGE):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_ONBOARDINGSTAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ONBOARDINGSTAGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ONBOARDINGSTAGE):
    case FAILURE(ACTION_TYPES.CREATE_ONBOARDINGSTAGE):
    case FAILURE(ACTION_TYPES.UPDATE_ONBOARDINGSTAGE):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_ONBOARDINGSTAGE):
    case FAILURE(ACTION_TYPES.DELETE_ONBOARDINGSTAGE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ONBOARDINGSTAGE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ONBOARDINGSTAGE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ONBOARDINGSTAGE):
    case SUCCESS(ACTION_TYPES.UPDATE_ONBOARDINGSTAGE):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_ONBOARDINGSTAGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ONBOARDINGSTAGE):
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

const apiUrl = 'api/onboarding-stages';

// Actions

export const getEntities: ICrudGetAllAction<IOnboardingStage> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ONBOARDINGSTAGE_LIST,
  payload: axios.get<IOnboardingStage>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IOnboardingStage> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ONBOARDINGSTAGE,
    payload: axios.get<IOnboardingStage>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IOnboardingStage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ONBOARDINGSTAGE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IOnboardingStage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ONBOARDINGSTAGE,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<IOnboardingStage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_ONBOARDINGSTAGE,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOnboardingStage> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ONBOARDINGSTAGE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
