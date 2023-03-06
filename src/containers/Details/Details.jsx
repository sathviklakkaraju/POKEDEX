import React, { useState, useEffect, useContext } from 'react';
import { GET_POKEMONS } from '../../state/actions';
import { DataContext } from "../../state/context";
import { useSearchParams } from "react-router-dom";
import { Grid } from "@mui/material";
import styles from "./Details.module.css";
import { useNavigate } from "react-router-dom";
import getPokemonData from '../../apis/pokemon';

function Details() {
	const navigate = useNavigate();

	const { state, dispatch } = useContext(DataContext);

	const [pokemon, setPokemon] = useState({});

	let [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		if (state.pokemons.length > 0) {
			filterPokemons();
		}
		else {
			getPokemonData().then(payload => {
				dispatch({
					type: GET_POKEMONS,
					payload
				});
			})
		}
	}, [state, searchParams]);

	const filterPokemons = () => {
		let tempArr = (state.pokemons).filter(pokemon => (pokemon.id === parseInt(searchParams.get("id"))));

		setPokemon(tempArr[0]);
	}

	return (
		<Grid container justifyContent={"center"} style={{ maxWidth: "1200px", margin: "auto" }}>
			<Grid item xs={10} sm={9} md={9} lg={11}>
				<Grid container justifyContent={"center"} alignItems={"center"}>
					<Grid item xs={12} sm={9} md={10} lg={8} style={{ padding: ".5rem" }}>
						<h1>{pokemon.name}</h1>
					</Grid>
				</Grid>
				<Grid container justifyContent={"center"} alignItems={"flex-start"}>
					<Grid item xs={12} sm={9} md={5} lg={4}>
						<img className={styles.pokemonImage} src={pokemon.img} alt={pokemon.name} />
					</Grid>
					<Grid item xs={12} sm={9} md={5} lg={4}>
						<Grid container className={styles.card}>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<h4 className={styles.subheading}>Height</h4>
								<p className={styles.label}>{pokemon.height}</p>
							</Grid>
							<Grid item xs={6} sm={6} md={6} lg={6}>
								<h4 className={styles.subheading}>Weight</h4>
								<p className={styles.label}>{pokemon.weight}</p>
							</Grid>
							<Grid item xs={12} sm={12} md={12} lg={12}>
								<h4 className={styles.subheading} style={{ paddingTop: "1rem" }}>Candy</h4>
								<p className={styles.label}>{pokemon.candy}</p>
							</Grid>
						</Grid>
						<Grid style={{ margin: ".5rem" }}>
							{
								Array.isArray(pokemon.type) && pokemon.type.length > 0 ?
									<div>
										<h4 style={{ marginBlockEnd: ".5em" }}>Type</h4>
										<section className={styles.tagContainer}>
											{
												pokemon.type.map((val) => (
													<div className={[styles.tag, `background-color-${val.toLowerCase()}`].join(" ")}>{val}</div>
												))
											}
										</section>
									</div>
									: null
							}
						</Grid>
						<Grid style={{ margin: ".5rem" }}>
							{
								Array.isArray(pokemon.weaknesses) && pokemon.weaknesses.length > 0 ?
									<div>
										<h4 style={{ marginBlockEnd: ".5em" }}>Weakness</h4>
										<section className={styles.tagContainer}>
											{
												pokemon.weaknesses.map((val) => (
													<div className={[styles.tag, `background-color-${val.toLowerCase()}`].join(" ")}>{val}</div>
												))
											}
										</section>
									</div>
									: null
							}
						</Grid>
					</Grid>
					<Grid item xs={12} sm={9} md={10} lg={8} style={{ padding: ".5rem", marginBottom: "5rem" }}>
						<div>
							<h1>Evolutions</h1>
						</div>
						<Grid container justifyContent={"space-around"} alignItems={"center"} style={{ gap: "2rem" }}>
							{
								Array.isArray(pokemon.prev_evolution) && pokemon.prev_evolution.length > 0 ?
									pokemon.prev_evolution.map(evolution => (
										<div style={{ textAlign: "center", position: "relative" }}>
											<img className={styles.roundImages} src={evolution.img} alt={evolution.name} />
											<h3>
												<a href={`/details?id=${parseInt(evolution.num)}`} onClick={(event) => {
													event.preventDefault();
													event.stopPropagation();

													navigate(`/details?id=${parseInt(evolution.num)}`);
												}} className={styles.redirect}>{evolution.name}</a>
											</h3>
										</div>
									))
									: null
							}

							<div style={{ textAlign: "center", position: "relative" }}>
								<img className={styles.roundImages} src={pokemon.img} alt={pokemon.name} />
								<h3>
									<a href={`/details?id=${parseInt(pokemon.num)}`} onClick={(event) => {
										event.preventDefault();
										event.stopPropagation();

										navigate(`/details?id=${parseInt(pokemon.num)}`);
									}} className={styles.redirect}>{pokemon.name}</a>
								</h3>
							</div>

							{
								Array.isArray(pokemon.next_evolution) && pokemon.next_evolution.length > 0 ?
									pokemon.next_evolution.map(evolution => (
										<div style={{ textAlign: "center", position: "relative" }}>
											<img className={styles.roundImages} src={evolution.img} alt={evolution.name} />
											<h3>
												<a href={`/details?id=${parseInt(evolution.num)}`} onClick={(event) => {
													event.preventDefault();
													event.stopPropagation();

													navigate(`/details?id=${parseInt(evolution.num)}`);
												}} className={styles.redirect}>{evolution.name}</a></h3>
										</div>
									))
									: null
							}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default Details;
