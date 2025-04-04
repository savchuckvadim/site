'use client';


import { useEffect } from 'react';
import { appInit } from './AppThunk';
import { useAppDispatch } from '../lib/hooks/redux';


// Вложенный компонент, который уже имеет доступ к стору
const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {

    dispatch(appInit());
  }, [dispatch]);

  return children;
};

export default AppInitializer;
