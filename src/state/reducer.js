import { GET_POKEMONS } from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            }
    
        default:
            return state;
    }
}