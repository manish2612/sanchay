"use client";

import { createContext, useContext } from "react";
import { Density } from "../types/density";

const DensityContext = createContext<Density>("default");

export const DensityProvider = DensityContext.Provider;

export const useDensity = () => {
  return useContext(DensityContext);
};
