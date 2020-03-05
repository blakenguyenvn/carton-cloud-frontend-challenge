import * as React from 'react';
import { Link } from 'react-router-dom';
import DeliveryService from '@/services/DeliveryService';
import DriverService from '@/services/DriverService';
import {
  Button,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@material-ui/core';
import * as SpacingStyle from '@/assets/styles/base/spacing.scss';

interface DeliveriesTableState {
  title: string,
  data:  any,
  drivers: any
};

const DeliveryConnector = new DeliveryService();
const DriverConnector = new DriverService();

export class DeliveriesTable extends React.Component<{}, DeliveriesTableState> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: 'Deliveries',
      data: [],
      drivers: []
    };
  }

  componentDidMount() {
    this.getDrivers();
    this.getDeliveries();
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    return this.state.data !== nextState.data ||
      this.state.drivers !== nextState.drivers;
  }

  // Get list drivers
  async getDrivers() {
    const drivers = await DriverConnector.getDrivers();

    this.setState({
      ...this.state,
      drivers,
    });
  }

  // Get list deliveries
  async getDeliveries() {
    const deliveries = await DeliveryConnector.getDeliveries();

    this.setState({
      ...this.state,
      data: deliveries,
    });
  }

  // Delete delivery
  async deleteDelivery(id: any) {
    const deleteResponse = await DeliveryConnector.deleteDelivery({ id });

    // Update new list
    this.getDeliveries();
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
              {Object.keys(this.state.data).map((id: any, index: any) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{this.state.data[id].date}</TableCell>
                  <TableCell>{this.state.data[id].name}</TableCell>
                  <TableCell>{this.state.drivers[this.state.data[id].driver_id].name }</TableCell>
                  <TableCell>
                    <Link key={id}
                      to={`/deliveries/${id}`}>
                      <Button variant="contained" color="primary">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={SpacingStyle.mgLeft_10}
                      onClick={() => this.deleteDelivery(id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
    );
  };
};
