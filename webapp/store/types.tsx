import { Action } from 'redux';

interface Delivery {
  id: string,
  date: string,
  name: string,
  driver: string
};

export interface LoadingState {
  deliveries: boolean
};

export interface ApplicationState {
  loading: LoadingState,
  deliveries: Delivery[]
};

export interface LoadDeliveriesRequest extends Action {
  type: 'loadDeliveriesRequest'
};

export interface LoadDeliveriesSuccess extends Action {
  type: 'loadDeliveriesSuccess'
};

export interface LoadDeliveriesError extends Action {
  type: 'loadDeliveriesError'
};

export type ApplicationAction = 
  | LoadDeliveriesRequest
  | LoadDeliveriesSuccess
  | loadDeliveriesError;
