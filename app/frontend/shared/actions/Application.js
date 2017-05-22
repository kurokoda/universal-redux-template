export const ROUTE_REQUESTED      = Symbol('ROUTE_REQUESTED');
export const SHOW_MODAL           = Symbol('SHOW_MODAL');
export const HIDE_MODAL           = Symbol('HIDE_MODAL');
export const UPDATE_IS_LOADING    = Symbol('UPDATE_IS_LOADING');
export const UPDATE_IS_REHYDRATED = Symbol('UPDATE_IS_REHYDRATED');

let type;

export function updateIsLoading(isLoading) {
  type = UPDATE_IS_LOADING;
  return {type, isLoading};
}

export function requestRoute(route) {
  type = ROUTE_REQUESTED;
  return {type, route};
}

export function showModal(modalContent) {
  type = SHOW_MODAL;
  return {type, modalContent};
}

export function hideModal() {
  type = HIDE_MODAL;
  return {type};
}

export function updateIsRehydrated() {
  type = UPDATE_IS_REHYDRATED;
  return {type};
}
