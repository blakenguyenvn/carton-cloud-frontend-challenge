import 'date-fns';
import * as React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { Link, Router, Redirect } from 'react-router-dom';
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
import { DELIVERY_CONFIGS } from '@/config/delivery';
import DeliveryService from '@/services/DeliveryService';
import DriverService from '@/services/DriverService';
import * as SpacingStyle from '@/assets/styles/base/spacing.scss';
import * as DeliveryStyle from '@/assets/styles/components/Delivery.scss';

interface DeliveryFormState {
  mode: string,
  deliveryId: string,
  date: string,
  name: string,
  driver: string,
  driverOptions: any,
  errors: any,
  alert: any,
  config: any,
  redirect: boolean
};

interface DeliveryFormProps {
  deliveryId: string,
};

const DeliveryConnector = new DeliveryService();
const DriverConnector = new DriverService();
const momentFormat = 'YYYY-MM-DD';
const dateNow = moment().utc().format(momentFormat);

export class DeliveryForm extends React.Component<DeliveryFormProps, DeliveryFormState> {
  constructor(props: any) {
    super(props);
    const mode = props.deliveryId ? 'update' : 'create';

    this.state = {
      mode,
      deliveryId: props.deliveryId,
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
      },
      config: DELIVERY_CONFIGS[mode],
      redirect: false
    };
  }

  // Hook: component mounted
  componentDidMount() {
    if (this.state.deliveryId) {
      this.getDelivery(this.state.deliveryId);
    }

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

  // Handle redirect to home page
  goToHome() {
    setTimeout(() => {
      this.setState({
        ...this.state,
        redirect: true
      });
    }, 1000);

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

  // Get Delivery detail
  async getDelivery(id: any) {
    const { date, name, driver_id } = await DeliveryConnector.getDelivery({ id });

    if (date && name && driver_id) {
      this.setState({
        ...this.state,
        date,
        name,
        driver: driver_id
      });
    }
  }

  // Get list drivers
  async getDrivers() {
    const drivers = await DriverConnector.getDrivers();

    this.setState({
      ...this.state,
      driverOptions: drivers
    });
  }

  // CREATE: New Delivery
  async createDelivery() {
    await this.validateDeliveryForm();
    const { validDate, validName, validDriver } = this.state.errors;

    // Check valid data and submit new delivery
    if (!validDate && !validName && !validDriver) {
      const { date, name, driver } = this.state;
      const payload = { date, name, driver_id: driver };
      const { errors } = await DeliveryConnector.newDelivery(payload);

      if (errors) {
        this.showAlert({ type: 'error', message: this.state.config.errorMessage });
        return;
      }

      this.showAlert({ type: 'success', message: this.state.config.successMessage });
      this.resetForm();
    }
  }

  // UPDATE: Delivery
  async updateDelivery() {
    await this.validateDeliveryForm();
    const { validDate, validName, validDriver } = this.state.errors;

    // Check valid data and submit new delivery
    if (!validDate && !validName && !validDriver) {
      const { date, name, driver } = this.state;
      const payload = { date, name, driver_id: driver };
      const { errors } = await DeliveryConnector.updateDelivery({
        id: this.state.deliveryId,
        payload
      });

      if (errors) {
        this.showAlert({ type: 'error', message: this.state.config.errorMessage });
        return;
      }

      await this.showAlert({ type: 'success', message: this.state.config.successMessage });
    }
  }

  // DELETE: Delivery
  async deleteDelivery() {
    const { errors } = await DeliveryConnector.deleteDelivery({
      id: this.state.deliveryId
    });

    if (errors) {
      this.showAlert({ type: 'error', message: this.state.config.deleteError });
      return;
    }

    this.showAlert({ type: 'success', message: this.state.config.deleteSuccess });
    this.resetForm();
    this.goToHome();
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
    if (this.state.redirect === true) {
      return <Redirect to='/' />
    }

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
                disabled={this.state.config.isUpdate}
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
              disabled={this.state.config.isUpdate}
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

        {this.state.config.isUpdate ? (
          <FormGroup row>
            <Button variant="contained" color="primary" onClick={this.updateDelivery.bind(this)}>
              {this.state.config.submitButton}
            </Button>
            <Button variant="contained" color="secondary" className={SpacingStyle.mgLeft_10} onClick={this.deleteDelivery.bind(this)}>
              {this.state.config.deleteButton}
            </Button>
          </FormGroup>
        ) : (
          <FormGroup row>
            <Button variant="contained" color="primary" onClick={this.createDelivery.bind(this)}>
              {this.state.config.submitButton}
            </Button>
          </FormGroup>
        )}
      </React.Fragment>
    );
  };
};
