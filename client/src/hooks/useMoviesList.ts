import { useEffect, useReducer, useState } from 'react';
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
      return { ...state, loading: true, error: null };
    case ActionEnum.FAILED:
      return { loading: false, error: action.payload, data: null };
    case ActionEnum.SUCCESS:
      return { loading: false, data: action.payload, error: null };
    default:
      return state;
  }
};

const useMoviesList = (offset: number) => {
  const [{ data, error, loading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [count, setCount] = useState<number | null>(null);

  const fetchMoviesList = async () => {
    if (data && count && data.length >= count) {
      return;
    }

    dispatch({ type: ActionEnum.LOADING });
    try {
      const response = await axios.get(
        `http://localhost:5000/movies/list?offset=${offset}`
      );
      const moviesData = data
        ? [...data, ...response.data.movies]
        : response.data.movies;
      setCount(response.data.count);
      dispatch({ type: ActionEnum.SUCCESS, payload: moviesData });
    } catch (error: any) {
      dispatch({ type: ActionEnum.FAILED, payload: error.message });
    }
  };

  useEffect(() => {
    fetchMoviesList();
  }, [offset]);

  return { data, error, loading };
};

export default useMoviesList;
