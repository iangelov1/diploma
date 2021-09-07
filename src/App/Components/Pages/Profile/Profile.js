
import React, { useContext, useEffect, useState } from "react";
import moment from 'moment';
import 'moment/locale/bg';

import { UserContext } from "../../../Context/userContext";
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tab, Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Button, TableContainer, Typography, Container, Tabs } from "@material-ui/core";

import { auth } from "../../Firebase/firebase";
import withAuthorization from '../../../Session/withAuthorization';

import { firestore } from '../../Firebase/firebase'

const useStyles = makeStyles({
    cards: {
        maxWidth: '1200px',
        margin: "0 auto"
    },
    clendar: {
        "& .rdrDefinedRangesWrapper": {
            display: 'none'
        }
    },
    paper: {
        height: '100%',
        padding: '16px',
        '.MuiTableRow-root:hover': {
            backgroundColor: 'red'
        }
    },
});

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const Profile = () => {
    const classes = useStyles();
    const [user, setUser] = useContext(UserContext);
    const [currentBooks, setCurrentBooks] = useState([])
    const [futureBooks, setFutureBooks] = useState([])
    const [pastBooks, setPastBooks] = useState([])
    const [value, setValue] = useState(0);
    const history = useHistory();
    moment.locale('bg')
    
    useEffect(() => {
        setCurrentBooks([]);
        setFutureBooks([]);
        setPastBooks([]);

        if (user.booksCurrentlyInUser) {
            user.booksCurrentlyInUser.map(el => {
                firestore.collection('books').doc(el.book).get().then(data => {
                    var newelem = {
                        bookID: el.book,
                        startDate: el.startDate,
                        endDate: el.endDate,
                        book: data.data(),
                        operationId: el.operationId
                    }
                    setCurrentBooks(old => [...old, newelem])
                })

            })
        }

        if (user.futureBooks) {
            user.futureBooks.map(el => {
                firestore.collection('books').doc(el.book).get().then(data => {
                    var newelem = {
                        bookID: el.book,
                        startDate: el.startDate,
                        endDate: el.endDate,
                        book: data.data(),
                        operationId: el.operationId

                    }

                    setFutureBooks(old => [...old, newelem])
                })

            })
        }

        if (user.returnedBooks) {
            user.returnedBooks.map(el => {
                firestore.collection('books').doc(el.book).get().then(data => {
                    var newelem = {
                        bookID: el.book,
                        startDate: el.startDate,
                        endDate: el.endDate,
                        book: data.data(),
                        operationId: el.operationId
                    }

                    setPastBooks(old => [...old, newelem])
                })

            })
        }
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container component="main" >
            {
                user !== undefined ?
                    (
                        <div className="content">
                            <Typography variant="h1" component="h1">Здравей {user.username}!</Typography>
                            <h3>E-mail: {user.email}</h3>

                            <Button color="secondary" variant="contained" style={{ display: 'block', marginBottom: '20px' }} onClick={() => { history.push('/changePassword') }}>Смени парола</Button>

                            <Button color="primary" variant="contained" className="w-full py-3 bg-red-600 mt-4 text-white" onClick={() => { auth.signOut() }}>Изход</Button>

                            <AppBar position="static" style={{ marginTop: '50px' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="fullWidth">
                                    <Tab label="Книги в потребителя" />
                                    <Tab label="Книги предстоящи" />
                                    <Tab label="Прочетени книги" />
                                </Tabs>
                            </AppBar>

                            <TabPanel value={value} index={0}>
                                <Paper className={classes.paper}>
                                    <Typography variant="h4" component="div"> Книги в потребителя </Typography>
                                    
                                    <TableContainer>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Книга</TableCell>
                                                    <TableCell>Автор</TableCell>
                                                    <TableCell>От дата</TableCell>
                                                    <TableCell>До дата</TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {currentBooks.length ?
                                                    currentBooks.map((row) => (
                                                        <TableRow key={row.operationId}>
                                                            <TableCell component="th" scope="row">
                                                                <Link style={{ textDecoration: 'none' }} to={{ pathname: `/books/${row.bookID}` }}>
                                                                    {row.book?.title}
                                                                </Link>
                                                            </TableCell>

                                                            <TableCell> {row.book?.author} </TableCell>

                                                            <TableCell>{moment(row.startDate?.seconds * 1000).format("dddd, DD.MM.YYYY")}</TableCell>

                                                            <TableCell>{moment(row.endDate?.seconds * 1000).format("dddd, DD.MM.YYYY")}</TableCell>
                                                        </TableRow>
                                                    ))
                                                    : 
                                                    <TableRow>
                                                        <TableCell colSpan={4} style={{textAlign:'center'}}>Нямате настоящи книги</TableCell>
                                                    </TableRow>
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </TabPanel>

                            <TabPanel value={value} index={1}>
                                <Paper className={classes.paper}>
                                    <Typography variant="h4" component="div"> Книги предстоящи </Typography>

                                    <TableContainer>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Книга</TableCell>
                                                    <TableCell>Автор</TableCell>
                                                    <TableCell>От дата</TableCell>
                                                    <TableCell>До дата</TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {futureBooks.length ?
                                                    futureBooks.map((row) => (
                                                        <TableRow key={row.operationId}>
                                                            <TableCell component="th" scope="row">
                                                                <Link style={{ textDecoration: 'none' }} to={{ pathname: `/books/${row.bookID}` }}>
                                                                    {row.book?.title}
                                                                </Link>
                                                            </TableCell>

                                                            <TableCell> {row.book?.author} </TableCell>
                                                            
                                                            <TableCell>{moment(row.startDate?.seconds * 1000).format("dddd, DD.MM.YYYY")}</TableCell>
                                                            
                                                            <TableCell>{moment(row.endDate?.seconds * 1000).format("dddd, DD.MM.YYYY")}</TableCell>
                                                        </TableRow>
                                                    ))
                                                    :
                                                    <TableRow>
                                                        <TableCell colSpan={4} style={{textAlign:'center'}}>Нямате намерени предстоящи книги</TableCell>
                                                    </TableRow>
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </TabPanel>

                            <TabPanel value={value} index={2}>
                                <Paper className={classes.paper}>
                                    <Typography variant="h4" component="div"> Книги минали </Typography>

                                    <TableContainer>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Книга</TableCell>
                                                    <TableCell>Автор</TableCell>
                                                    <TableCell>От дата</TableCell>
                                                    <TableCell>До дата</TableCell>
                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {pastBooks.length ?
                                                    pastBooks.map((row) => (
                                                        <TableRow key={row.operationId}>
                                                            <TableCell component="th" scope="row">
                                                                <Link style={{ textDecoration: 'none' }} to={{ pathname: `/books/${row.bookID}` }}>
                                                                    {row.book?.title}
                                                                </Link>
                                                            </TableCell>

                                                            <TableCell> {row.book?.author} </TableCell>

                                                            <TableCell>{moment(row.startDate?.seconds * 1000).format("dddd, DD.MM.YYYY")}</TableCell>

                                                            <TableCell>{moment(row.endDate?.seconds * 1000).format("dddd, DD.MM.YYYY")}</TableCell>
                                                        </TableRow>
                                                    ))
                                                    : 
                                                    <TableRow>
                                                        <TableCell colSpan={4} style={{textAlign:'center'}}>Нямате намерени прочетени книги</TableCell>
                                                    </TableRow>
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </TabPanel>
                        </div>
                    )
                    : null
            }
        </Container>
    );
}
const condition = user => user.role !== "banned";

export default withAuthorization(condition)(Profile);