export interface Loadable<T, E> {
  loaded: boolean;
  loading?: boolean;
  items: T;
  error: E;
}
