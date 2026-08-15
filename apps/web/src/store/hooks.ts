import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

/**
 * Typed versions of the standard Redux hooks.
 *
 * Always import these instead of the plain `useDispatch` / `useSelector`
 * from 'react-redux' to get full TypeScript support without casting.
 *
 * @example
 * const dispatch = useAppDispatch();
 * const value = useAppSelector((state) => state.someSlice.value);
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
