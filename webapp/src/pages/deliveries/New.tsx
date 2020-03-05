import * as React from 'react';
import Container from '@material-ui/core/Container';
import { Header } from '@/components/Header';
import { DeliveryForm } from '@/components/deliveries/DeliveryForm';
import * as DeliveryStyle from '@/assets/styles/components/Delivery.scss';

interface NewDeliveryPageState {
  title: string,
};

export default class NewDeliveryPage extends React.Component<{}, NewDeliveryPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: 'New Delivery',
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
          <DeliveryForm deliveryId={null}/>
        </Container>
      </React.Fragment>
    );
  };
};
