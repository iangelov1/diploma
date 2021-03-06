import React, { useEffect, useState } from "react";
import { firestore } from '../../Firebase/firebase'
// import { firestore } from 'firebase-admin';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import withAuthorization from '../../../Session/withAuthorization'
import { BrowserRouter as Router, Link, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles((theme) => ({
  paper: {
    height: '100%',
    padding: '16px',
    '.MuiTableRow-root:hover': {
      backgroundColor: 'red'
    }
  },
  addBook: {
    height: '100%',
    padding: '16px',
    textAlign: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },

}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}
function Admin() {
  const classes = useStyles();
  const [books, setBooks] = useState([])
  const [booksToBeTaken, setBooksToBeTaken] = useState({})
  const [booksToBeReturned, setBooksToBeReturned] = useState({})
  const [??xpired, set??xpired] = useState({})
  const [??xpiredToBeTaken, set??xpiredToBeTaken] = useState({})
  const [searchTake, setSearchTake] = useState('')
  const [searchReturn, setSearchReturn] = useState('')
  const [search??xpired, setSearch??xpired] = useState('')
  const [search??xpiredToBeTaken, setSearch??xpiredToBeTaken] = useState('')
  const [localUser, setLocalUser] = useState({})
  const [value, setValue] = React.useState(0);

  const fetchData = async () => {
    const data = await firestore.collection("operations").get();
    setBooks(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };
  useEffect(() => {
    fetchData();
  }, []);

  var today = new Date()

  useEffect(() => {
    let filteredArray = books
      .filter(element =>
        element.status === "toBeTaken"
      )
      .filter(element =>
        element.startDate.toDate().toDateString() === today.toDateString()
      );
    let filteredArray1 = books
      .filter(element =>
        element.status === "inUser"
      )
      .filter(element =>
        element.endDate.toDate().toDateString() === today.toDateString()
      );
    let filteredArray3 = books
      .filter(element =>
        element.status === "inUser"
      )
      .filter(element =>
        Date.parse(element.endDate.toDate().toDateString()) < Date.parse(today.toDateString())
      );

    let filteredArray4 = books
      .filter(element =>
        element.status === "toBeTaken"
      )
      .filter(element =>
        Date.parse(element.startDate.toDate().toDateString()) < Date.parse(today.toDateString())
      );

    setBooksToBeTaken(filteredArray)
    setBooksToBeReturned(filteredArray1)
    set??xpired(filteredArray3)
    set??xpiredToBeTaken(filteredArray4)
  }, [books])

  useEffect(() => {
    let filteredArray = books
      .filter(element =>
        element.status === "toBeTaken"
      )
      .filter(element =>
        element.startDate.toDate().toDateString() === today.toDateString()
      );
    if (searchTake === '') {
      setBooksToBeTaken(filteredArray)
    }
    else {
      setBooksToBeTaken(filteredArray.filter(card =>
        card.user.username.toLowerCase().includes(searchTake.toLowerCase()) || card.book.title.toLowerCase().includes(searchTake.toLowerCase())))
    }
  }, [searchTake])

  useEffect(() => {
    let filteredArray = books
      .filter(element =>
        element.status === "inUser"
      )
      .filter(element =>
        element.startDate.toDate().toDateString() === today.toDateString()
      );
    if (searchReturn === '') {
      setBooksToBeReturned(filteredArray)
    }
    else {
      setBooksToBeReturned(filteredArray.filter(card =>
        card.user.username.toLowerCase().includes(searchReturn.toLowerCase()) || card.book.title.toLowerCase().includes(searchReturn.toLowerCase())))
    }
  }, [searchReturn])

  useEffect(() => {
    let filteredArray = books
      .filter(element =>
        element.status === "inUser"
      )
      .filter(element =>
        element.endDate.toDate() < today
      );
    if (search??xpired === '') {
      set??xpired(filteredArray)
    }
    else {
      set??xpired(filteredArray.filter(card =>
        card.user.username.toLowerCase().includes(search??xpired.toLowerCase()) || card.book.title.toLowerCase().includes(search??xpired.toLowerCase())))
    }
  }, [search??xpired])

  useEffect(() => {
    let filteredArray = books
      .filter(element =>
        element.status === "toBeTaken"
      )
      .filter(element =>
        element.startDate.toDate() < today
      );
    if (search??xpired === '') {
      set??xpiredToBeTaken(filteredArray)
    }
    else {
      set??xpiredToBeTaken(filteredArray.filter(card =>
        card.user.username.toLowerCase().includes(search??xpiredToBeTaken.toLowerCase()) || card.book.title.toLowerCase().includes(search??xpiredToBeTaken.toLowerCase())))
    }
  }, [search??xpiredToBeTaken])

  const ChangeStatusToTaken = async (operation) => {
    const data = await firestore.collection('users').doc(operation.user.uid).get()
    var removedItem = data.data().futureBooks.filter(el => el.operationId === operation.id)
    var newFuture = data.data().futureBooks.filter(el => el.operationId !== operation.id)
    var newCurrent = data.data().booksCurrentlyInUser
    newCurrent.push(removedItem[0])

    firestore.collection('users').doc(operation.user.uid).set({ ...data.data(), futureBooks: newFuture, booksCurrentlyInUser: newCurrent })
    firestore.collection('operations').doc(operation.id).set({ ...operation, status: 'inUser' }).then(fetchData())
    fetchData().then(toast.success(() => (
      <>?????????????? ???????????????????? ?????????????? ???? { operation.book.title} ???? ??????????!</>
    )));
  }

  const ChangeStatusToReturned = async (operation) => {
    const data = await firestore.collection('users').doc(operation.user.uid).get()
    var removedItem = data.data().booksCurrentlyInUser.filter(el => el.operationId === operation.id)
    var newCurrent = data.data().booksCurrentlyInUser.filter(el => el.operationId !== operation.id)
    var newReturned = data.data().returnedBooks
    newReturned.push(removedItem[0])
    toast.success(() => (
      <>?????????????? ???????????????????? ?????????????? ???? { operation.book.title} ???? ??????????????!</>
    ))
    firestore.collection('users').doc(operation.user.uid).set({ ...data.data(), booksCurrentlyInUser: newCurrent, returnedBooks: newReturned })
    firestore.collection('operations').doc(operation.id).set({ ...operation, status: 'returned' }).then(fetchData())
    fetchData();
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container component="main" >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <CssBaseline />
      <div >
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <Typography variant="h2">Dashboard</Typography>
          </Grid>
          <Grid item xs={3}>
            <Link style={{ textDecoration: 'none' }} to={'/addBook'}>
              <Paper className={classes.addBook}>
                <AddCircleOutlineOutlinedIcon />

                <Typography variant="h6" component="div">
                  ???????????? ??????????
                </Typography>
              </Paper>

            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link style={{ textDecoration: 'none' }} to={'/users'}>
              <Paper className={classes.addBook}>
                <SupervisedUserCircleIcon />
                <Typography variant="h6" component="div">
                  ??????????????????????
                </Typography>
              </Paper>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link style={{ textDecoration: 'none' }} to={'/books'}>
              <Paper className={classes.addBook}>
                <ImportContactsIcon />
                <Typography variant="h6" component="div">
                  ??????????
                </Typography>
              </Paper>

            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link style={{ textDecoration: 'none' }} to={'/users'}>
              <Paper className={classes.addBook}>
                <PersonAddIcon />

                <Typography variant="h6" component="div">
                  ?????? ????????????????????
                </Typography>
              </Paper>

            </Link>
          </Grid>
          <Grid item xs={12}>

            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
                centered
              >
                <Tab label="???? ??????????????" />
                <Tab label="???? ??????????????" />
                <Tab label="???????????????????? (??????????????)" />
                <Tab label="???????????????????? (??????????????)" />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <Paper className={classes.paper}>
                <Grid container spacing={2} >
                  <Grid item xs={6}>
                    <Typography variant="h4" component="div">
                      ???? ??????????????
                  </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className={classes.searchBar}
                      id="standard-search"
                      label="?????????? / ????????????????????"
                      fullWidth
                      value={searchTake}
                      type="search"
                      onChange={(e) => setSearchTake(e.target.value)} />
                  </Grid>
                </Grid>
                <TableContainer >
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Book</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>User</TableCell>
                        <TableCell>From Date</TableCell>
                        <TableCell>To date</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {booksToBeTaken.length ?
                        booksToBeTaken.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              <Link style={{ textDecoration: 'none' }} to={{ pathname: `/books/${row.bookId}` }}>
                                {row.book.title}
                              </Link>
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.book.location}
                            </TableCell>
                            <TableCell>
                              <Link style={{ textDecoration: 'none' }} to={{ pathname: `/users/${row.user.uid}` }}>
                                {row.user.username}
                              </Link>
                            </TableCell>
                            <TableCell>
                              {row.startDate.toDate().toDateString()}
                            </TableCell>
                            <TableCell>
                              {row.endDate.toDate().toDateString()}
                            </TableCell>
                            <TableCell>
                              <Button color="primary" variant="contained" className={classes.clBtn} onClick={() => ChangeStatusToTaken(row)} >??????????</Button>
                            </TableCell>
                          </TableRow>
                        ))
                        : null
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Paper className={classes.paper}>
                <Grid container spacing={2} >
                  <Grid item xs={6}>
                    <Typography variant="h4" component="div">
                      ???? ??????????????
                  </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className={classes.searchBar}
                      id="standard-search"
                      label="?????????? / ????????????????????"
                      fullWidth
                      value={searchReturn}
                      type="search"
                      onChange={(e) => setSearchReturn(e.target.value)} />
                  </Grid>
                </Grid>
                <TableContainer >
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Book</TableCell>
                        <TableCell>Location</TableCell>

                        <TableCell>User</TableCell>
                        <TableCell>From Date</TableCell>
                        <TableCell>To date</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {booksToBeReturned.length ?
                        booksToBeReturned.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              <Link style={{ textDecoration: 'none' }} to={{ pathname: `/books/${row.bookId}` }}>
                                {row.book.title}
                              </Link>
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.book.location}
                            </TableCell>
                            <TableCell>
                              <Link style={{ textDecoration: 'none' }} to={{ pathname: `/users/${row.user.uid}` }}>
                                {row.user.username}
                              </Link>
                            </TableCell>
                            <TableCell>
                              {row.startDate.toDate().toDateString()}
                            </TableCell>
                            <TableCell>
                              {row.endDate.toDate().toDateString()}
                            </TableCell>
                            <TableCell><Button color="primary" variant="contained" className={classes.clBtn} onClick={() => ChangeStatusToReturned(row)}>??????????????</Button></TableCell>

                          </TableRow>
                        ))
                        : null
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Paper className={classes.paper}>
                <Grid container spacing={2} >
                  <Grid item xs={6}>
                    <Typography variant="h4" component="div">
                      ????????????????????
                  </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className={classes.searchBar}
                      id="standard-search"
                      label="?????????? / ????????????????????"
                      fullWidth
                      value={search??xpired}
                      type="search"
                      onChange={(e) => setSearch??xpired(e.target.value)} />
                  </Grid>
                </Grid>
                <TableContainer >
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Book</TableCell>
                        <TableCell>Location</TableCell>

                        <TableCell>User</TableCell>
                        <TableCell>From Date</TableCell>
                        <TableCell>To date</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {??xpired.length ?
                        ??xpired.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              <Link style={{ textDecoration: 'none' }} to={{ pathname: `/books/${row.bookId}` }}>
                                {row.book.title}
                              </Link>
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.book.location}
                            </TableCell>
                            <TableCell>
                              <Link style={{ textDecoration: 'none' }} to={{ pathname: `/users/${row.user.uid}` }}>
                                {row.user.username}
                              </Link>
                            </TableCell>
                            <TableCell>
                              {row.startDate.toDate().toDateString()}
                            </TableCell>
                            <TableCell>
                              {row.endDate.toDate().toDateString()}
                            </TableCell>
                            <TableCell><Button color="primary" variant="contained" className={classes.clBtn} onClick={() => ChangeStatusToReturned(row)}>??????????????</Button></TableCell>

                          </TableRow>
                        ))
                        : null
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </TabPanel> 


            <TabPanel value={value} index={3}>
              <Paper className={classes.paper}>
                <Grid container spacing={2} >
                  <Grid item xs={6}>
                    <Typography variant="h4" component="div">
                      ????????????????????(??????????????)
                  </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      className={classes.searchBar}
                      id="standard-search"
                      label="?????????? / ????????????????????"
                      fullWidth
                      value={search??xpiredToBeTaken}
                      type="search"
                      onChange={(e) => setSearch??xpiredToBeTaken(e.target.value)} />
                  </Grid>
                </Grid>
                <TableContainer >
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Book</TableCell>
                        <TableCell>Location</TableCell>

                        <TableCell>User</TableCell>
                        <TableCell>From Date</TableCell>
                        <TableCell>To date</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {??xpiredToBeTaken.length ?
                        ??xpiredToBeTaken.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              <Link style={{ textDecoration: 'none' }} to={{ pathname: `/books/${row.bookId}` }}>
                                {row.book.title}
                              </Link>
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {row.book.location}
                            </TableCell>
                            <TableCell>
                              <Link style={{ textDecoration: 'none' }} to={{ pathname: `/users/${row.user.uid}` }}>
                                {row.user.username}
                              </Link>
                            </TableCell>
                            <TableCell>
                              {row.startDate.toDate().toDateString()}
                            </TableCell>
                            <TableCell>
                              {row.endDate.toDate().toDateString()}
                            </TableCell>
                            <TableCell><Button color="primary" variant="contained" className={classes.clBtn} onClick={() => ChangeStatusToTaken(row)}>??????????</Button></TableCell>

                          </TableRow>
                        ))
                        : null
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </TabPanel>


          </Grid>


        </Grid>
      </div>
    </Container>
  );
}
const condition = authUser => authUser.role === "admin";

export default withAuthorization(condition)(Admin);
