import * as React from 'react';
import Container from '@material-ui/core/Container';
import DeliveryService from '@/services/DeliveryService';
import { Header } from '@/components/Header';
import { DeliveryForm } from '@/components/deliveries/DeliveryForm';
import * as DeliveryStyle from '@/assets/styles/components/Delivery.scss';

interface EditDeliveryPageState {
  title: string,
  deliveryId: string
};

const DeliveryConnector = new DeliveryService();

export default class EditDeliveryPage extends React.Component<{}, EditDeliveryPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      title: 'Edit Delivery',
      deliveryId: props.match.params.id
    };
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Container maxWidth="lg">
          <h1 className={DeliveryStyle.pageTitle}>
            {this.state.title}
          </h1>
          <DeliveryForm deliveryId={this.state.deliveryId}/>
        </Container>
      </React.Fragment>
    );
  };
};
