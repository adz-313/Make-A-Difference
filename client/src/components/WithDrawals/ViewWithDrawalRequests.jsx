import { Box, Button, Grid, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { cyan } from '@mui/material/colors';
import React from 'react';
import WithDrawalRequest from '../WithDrawals/WithDrawalRequest';
import { Link, useParams } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
'&:nth-of-type(odd)': {
    backgroundColor: cyan[300]
},
// hide last border
'&:last-child td, &:last-child th': {
    border: 0,
},
}));

const ViewWithDrawalRequests = () => {

    const params = useParams();

    return (
        <Box
            sx={{
                flexGrow: 1,
                marginTop: "7rem",
            }}
        >
            <Grid container>
                <Grid container direction="row"   justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h5" color="textprimary" component="div">WithDrawal Request for Test</Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            component={Link}
                            to={`/fundraiser/${params.id}/withdrawal/new`}
                        >Add WithDrawal Request</Button>
                    </Grid>
                </Grid>
                <Grid container sx={{marginTop: "2rem"}}>
                    <TableContainer component={Paper}>
                        <Table aria-label="allrequests">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>ID</StyledTableCell>
                                    <StyledTableCell>Description</StyledTableCell>
                                    <StyledTableCell>AMOUNT</StyledTableCell>
                                    <StyledTableCell>WALLET ADDRESS</StyledTableCell>
                                    <StyledTableCell>APPROVAL COUNT</StyledTableCell>
                                    <StyledTableCell>APPROVE</StyledTableCell>
                                    <StyledTableCell>REJECT</StyledTableCell>
                                    <StyledTableCell>STATUS</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableCell component="th" scope="row">1</StyledTableCell>
                                <StyledTableCell component="th" scope="row">Need for Oxygen Cylinders in Pune</StyledTableCell>
                                <StyledTableCell component="th" scope="row">$1200</StyledTableCell>
                                <StyledTableCell component="th" scope="row">dfSd2w4e52cvsyd</StyledTableCell>
                                <StyledTableCell component="th" scope="row">0/100</StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    <Button
                                      color="success"
                                    >
                                        Approve
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    <Button
                                      color="error"
                                    >
                                        Reject
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">Not approved yet</StyledTableCell>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ViewWithDrawalRequests;