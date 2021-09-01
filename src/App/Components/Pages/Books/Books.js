import React, { useEffect } from "react";
import { firestore } from '../../Firebase/firebase'

import { Grid, TextField, Typography, Container } from '@material-ui/core';

import BookCard from './BookCard';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    cards: {
        maxWidth: '1200px',
        margin: "0 auto",
        width: '100%'
    }
});

const Books = ({ searchWord }) => {
    const classes = useStyles();

    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    useEffect(() => {
        fetchMovies()
    }, [])

    async function fetchMovies() {
        const response = await firestore.collection("books").get();
        const filteredData = response.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setSearchResults(filteredData)
    }

    useEffect(() => {
        const filteredPersons = searchResults.filter(
            person => {
                return (
                    person?.title?.includes(searchTerm)
                );
            }
        );

        setSearchResults(filteredPersons);
    }, [searchTerm]);

    useEffect(() => {
        if(searchTerm === "") {
            fetchMovies()
        }
    }, [searchResults])


    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    return (
        <Container component="main" >
            <div className="ais-InstantSearch" style={{ marginBottom: '100px' }}>
                <Typography variant="h6" noWrap> Всички книги </Typography>

                <form noValidate action="" role="search">
                    <TextField type="search" className={classes.searchBar} value={searchTerm} onChange={handleChange} />
                </form>

                <Grid container direction="row" justify="center" spacing={5} className={classes.cards}>
                    {searchResults.map(item => (
                        <Grid key={item.id} item xs={12} sm={4} md={3}>
                            <BookCard book={item} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Container>
    )
}

export default Books;