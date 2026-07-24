import { useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
    const { setDrawerOptions } = useDrawerContext();
}