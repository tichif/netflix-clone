import { useEffect, useReducer } from 'react';
import axios from 'axios';

import type { Movie } from '../types';

interface State {
  data: Movie[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  data: null,
  error: null,
  loading: false,
};

enum ActionEnum {
  LOADING,
  SUCCESS,
  FAILED,
}

type Action =
  | { type: ActionEnum.LOADING }
  | { type: ActionEnum.SUCCESS; payload: Movie[] }
  | { type: ActionEnum.FAILED; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionEnum.LOADING:
      return { loading: true, error: null, data: null };
    case ActionEnum.FAILED:
      return { loading: false, error: action.payload, data: null };
    case ActionEnum.SUCCESS:
      return { loading: false, data: action.payload, error: null };
    default:
      return state;
  }
};

const useMoviesList = () => {
  const [{ data, error, loading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const fetchMoviesList = async () => {
    dispatch({ type: ActionEnum.LOADING });
    try {
      const response = await axios.get('http://localhost:5000/movies/list');
      dispatch({ type: ActionEnum.SUCCESS, payload: response.data });
    } catch (error: any) {
      dispatch({ type: ActionEnum.FAILED, payload: error.message });
    }
  };

  useEffect(() => {
    fetchMoviesList();
  }, []);

  return { data, error, loading };
};

export default useMoviesList;
