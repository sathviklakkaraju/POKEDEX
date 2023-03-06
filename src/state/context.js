import React, { createContext, useReducer } from 'react';
import { reducer } from "./reducer";

const initialState = {
    "pokemons": []
};
const DataContext = createContext(initialState);

function DataContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    );
}

export { DataContext, DataContextProvider };
