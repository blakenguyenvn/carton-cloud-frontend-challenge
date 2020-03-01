import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

interface DeliveriesTableState {
  title: string,
  data: any,
};

export class DeliveriesTable extends React.Component<{}, DeliveriesTableState> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: 'Deliveries',
      data: [
        { date: '2018-01-01', name: 'Jimmy Jonse', driver: 'Johnny' },
      ],
    };
  }

  render() {
    return(
      <React.Fragment>
        <TableContainer component={Paper}>
          <Table aria-label={this.state.title}>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Driver</TableCell>
                <TableCell align="left">&nbsp;&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((row: any, index: number) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    1
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.driver}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
    );
  };
};
