import React from 'react';
import { Grid } from '@mui/material';
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    
    return (
        <Grid item md={12} className={styles.header}>
            <Grid container justifyContent={"center"} alignItems={"center"} style={{ position: "relative" }}>
                <img src='./pokeball.png' className={styles.icon} alt="Pokeball" />
                <h2>
                    <a href={"/"} onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();

                        navigate("/")
                    }} className={styles.redirect}>Pokedex</a>
                </h2>
            </Grid>
        </Grid>
    );
}

export default Header;
