import { createContext } from "react";
import { ISContext } from "../../src/interfaces";

export const snackbarContext = createContext<ISContext>( null );