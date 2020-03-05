import 'date-fns';
import * as React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Button,
  Grid,
  Paper,
  FormGroup,
  FormControl,
  FormLabel,
  TextField,
  Select,
  MenuItem
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DeliveryService from '@/services/DeliveryService';
import DriverService from '@/services/DriverService';
import * as SpacingStyle from '@/assets/styles/base/spacing.scss';
import * as DeliveryStyle from '@/assets/styles/components/Delivery.scss';

interface DeliveryFormState {
  date: string,
  name: string,
  driver: string,
  driverOptions: any,
  errors: any,
  alert: any
};

interface DeliveryFormProps {
  currentDelivery: any
}

const DeliveryConnector = new DeliveryService();
const DriverConnector = new DriverService();
const momentFormat = 'YYYY-MM-DD';
const dateNow = moment().utc().format(momentFormat);

export class DeliveryForm extends React.Component<DeliveryFormProps, DeliveryFormState> {
  constructor(props: any) {
    super(props);

    this.state = {
      date: dateNow,
      name: '',
      driver: '',
      driverOptions: [],
      errors: {
        validDate: false,
        validName: false,
        validDriver: false
      },
      alert: {
        message: '',
        show: false,
        type: 'success'
      }
    };
  }

  // Hook: component mounted
  componentDidMount() {
    this.getDrivers();
  }

  // Hook: trigger component update
  shouldComponentUpdate(nextProps: any, nextState: any) {
    return this.state !== nextState;
  }

  // Reset form data
  resetForm() {
    this.setState({
      ...this.state,
      date: dateNow,
      name: '',
      driver: ''
    });
  }

  // Handle show/hide alert
  showAlert({ type, message }: any) {
    const alert = { type, message, show: true };

    // Show alert
    this.setState({
      ...this.state,
      alert
    });

    setTimeout(() => {
      alert.show = false;
      // Hide alert
      this.setState({
        ...this.state,
        alert
      });
    }, 8000);
  }

  // Get list drivers
  async getDrivers() {
    const drivers = await DriverConnector.getDrivers();

    this.setState({
      ...this.state,
      driverOptions: drivers
    });
  }

  // Get list deliveries
  async addDelivery() {
    await this.validateDeliveryForm();
    const { validDate, validName, validDriver } = this.state.errors;

    // Check valid data and submit new delivery
    if (!validDate && !validName && !validDriver) {
      const { date, name, driver } = this.state;
      const payload = { date, name, driver_id: driver };
      const { errors } = await DeliveryConnector.newDelivery(payload);

      if (errors) {
        this.showAlert({ type: 'error', message: 'Delivery creating failed, please check your data and try again!' });
        return;
      }

      this.showAlert({ type: 'success', message: 'Delivery created successfully!' });
      this.resetForm();
    }
  }

  // Handle date change
  async handleDateChange(date: any) {
    await this.setState({
      ...this.state,
      date: moment(date).format(momentFormat)
    });

    this.validateDeliveryForm();
  }

  // Handle name change
  async handleNameChange(event: any) {
    await this.setState({
      ...this.state,
      name: event.target.value
    });

    this.validateDeliveryForm();
  }

  // Handle driver change
  async handleDriverChange(event: any) {
    await this.setState({
      ...this.state,
      driver: event.target.value
    });

    this.validateDeliveryForm();
  }

  // Validate delivery form
  validateDeliveryForm() {
    const errors = this.state.errors;
    errors.validDate = !this.state.date ? true : false;
    errors.validName = !this.state.name.length ? true : false;
    errors.validDriver = !this.state.driver ? true : false;

    this.setState({
      ...this.state,
      errors
    });
  }

  render() {
    return(
      <React.Fragment>
        {this.state.alert.show ? (
          <Alert className={DeliveryStyle.alert} severity={this.state.alert.type}>{this.state.alert.message}</Alert>
        ) : (
          <div className={DeliveryStyle.alert}>&nbsp;</div>
        )}

        <FormGroup className={DeliveryStyle.formGroup} row>
          <FormControl className={DeliveryStyle.formControl}>
            <FormLabel component="legend">Date</FormLabel>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                format="yyyy-MM-dd"
                value={this.state.date}
                error={this.state.errors.validDate}
                onChange={this.handleDateChange.bind(this)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            {this.state.errors.validDate ? (
              <p className={DeliveryStyle.error}><small>Please pick a date</small></p>
            ) : (
              <p>&nbsp;</p>
            )}
          </FormControl>

          <FormControl className={DeliveryStyle.formControl}>
            <FormLabel component="legend">Name</FormLabel>
            <TextField
              id="delivery_name"
              error={this.state.errors.validName}
              value={this.state.name}
              onChange={this.handleNameChange.bind(this)}
            />
            {this.state.errors.validName ? (
              <p className={DeliveryStyle.error}><small>Please enter Delivery name</small></p>
            ) : (
              <p>&nbsp;</p>
            )}
          </FormControl>

          <FormControl className={DeliveryStyle.formControl}>
            <FormLabel component="legend">Driver</FormLabel>
            <Select
              id="delivery_driver"
              error={this.state.errors.validDriver}
              value={this.state.driver}
              onChange={this.handleDriverChange.bind(this)}
            >
              {Object.keys(this.state.driverOptions).map((id: any, index: any) => (
                <MenuItem key={id} value={id}>{this.state.driverOptions[id].name}</MenuItem>
              ))}
            </Select>
            {this.state.errors.validDriver ? (
              <p className={DeliveryStyle.error}><small>Please select a Driver</small></p>
            ) : (
              <p>&nbsp;</p>
            )}
          </FormControl>
        </FormGroup>
        <FormGroup row>
          <FormControl>
            <Button variant="contained" color="primary" onClick={this.addDelivery.bind(this)}>Create Delivery</Button>
          </FormControl>
        </FormGroup>
      </React.Fragment>
    );
  };
};
