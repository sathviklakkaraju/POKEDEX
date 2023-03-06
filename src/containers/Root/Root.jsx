import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from "../../state/context";
import { FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Chip, Box, Checkbox } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import styles from "./Root.module.css";
import { useNavigate } from "react-router-dom";
import { GET_POKEMONS } from '../../state/actions';
import getPokemonData from '../../apis/pokemon';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const pokemonTypes = [
    'Normal',
    'Fire',
    'Water',
    'Grass',
    'Electric',
    'Ice',
    'Fighting',
    'Poison',
    'Ground',
    'Flying',
    'Psychic',
    'Bug',
    'Rock',
    'Ghost',
    'Dragon',
    'Dark',
    'Steel',
    'Fairy',
];

function Root() {
    const navigate = useNavigate();

    const { state, dispatch } = useContext(DataContext);

    const [search, setSearch] = useState("");
    const [type, setType] = useState([]);

    const [pokemons, setPokemonData] = useState([]);

    useEffect(() => {
        console.log("Api Requested");
        getPokemonData().then(payload => {
            setPokemonData(payload);

            dispatch({
                type: GET_POKEMONS,
                payload
            });
        });
    }, []);

    useEffect(() => {
        if (Array.isArray(state.pokemons) && state.pokemons.length > 0) {
            let filteredArray = [];

            // Filter Pokemon's based on Search
            if (search !== null && search !== "") {
                filteredArray = ((pokemons.length > 0 && pokemons) || (state.pokemons)).filter(pokemon => {
                    return ((pokemon.name).toString().toLowerCase().startsWith(search.toString().toLowerCase()));
                });
            }

            // Filter Pokemon's based on Type
            if (Array.isArray(type) && type.length > 0) {
                filteredArray = ((filteredArray.length > 0 && filteredArray) || (state.pokemons)).filter(pokemon => {
                    return type.every(i => (pokemon.type).includes(i))
                })
            }

            setPokemonData(filteredArray.length > 0 ? filteredArray : state.pokemons);
        }
    }, [search, type]);

    return (
        <>
            <Grid container justifyContent={"center"}>
                <Grid item md={11}>
                    <Grid container justifyContent={"center"}>
                        <Grid item xs={12} sm={6} md={8} lg={8}>
                            <FormControl sx={{ m: 1, width: "calc(100% - 16px)" }} variant="outlined">
                                <OutlinedInput
                                    variant="outlined"
                                    type='text'
                                    value={search}
                                    onChange={({ target: { value } }) => { setSearch(value) }}
                                    placeholder="Search for Pokemon's"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton edge="end">
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <FormControl sx={{ m: 1, width: "calc(100% - 16px)" }}>
                                <InputLabel id="type-label">Type</InputLabel>
                                <Select
                                    labelId="type-label"
                                    id="type"
                                    className={styles.input}
                                    multiple
                                    value={type}
                                    onChange={({ target: { value } }) => { setType(typeof value === 'string' ? value.split(',') : value) }}
                                    input={<OutlinedInput id="select-multiple-type" label="Type" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        pokemonTypes.map((pokemonType) => (
                                            <MenuItem
                                                key={pokemonType}
                                                value={pokemonType}
                                            >
                                                <Checkbox checked={type.indexOf(pokemonType) > -1} />
                                                {pokemonType}
                                            </MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent={"center"}>
                        <Grid className={styles.pokemoncontainer} item xs={12} sm={12} md={11} lg={11}>
                            <Grid container flexWrap="wrap" justifyContent={"space-evenly"}>
                                {
                                    pokemons.map((pokemon) => (
                                        <Grid className={styles.card} item xs={5} sm={5} md={3} lg={2} key={pokemon.id}>
                                            <img className={styles.pokemonImage} src={pokemon.img} loading="lazy" />
                                            <div style={{ padding: ".5rem" }}>
                                                <p className={styles.id}>#{pokemon.num}</p>
                                                <h2 style={{ marginBlockEnd: "0.5em" }}>
                                                    <a href={`/details?id=${pokemon.id}`} onClick={(event) => {
                                                        event.preventDefault();
                                                        event.stopPropagation();

                                                        navigate(`/details?id=${pokemon.id}`)
                                                    }} className={styles.redirect}>{pokemon.name}</a>
                                                </h2>
                                                {
                                                    Array.isArray(pokemon.type) && pokemon.type.length > 0 ?
                                                        <section className={styles.tagContainer}>
                                                            {
                                                                pokemon.type.map((val) => (
                                                                    <div className={[styles.tag, `background-color-${val.toLowerCase()}`].join(" ")}>{val}</div>
                                                                ))
                                                            }
                                                        </section>
                                                        : null
                                                }
                                            </div>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Root;
