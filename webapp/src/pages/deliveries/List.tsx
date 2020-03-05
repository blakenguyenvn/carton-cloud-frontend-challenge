import * as React from 'react';
import Container from '@material-ui/core/Container';
import { Header } from '@/components/Header';
import { DeliveriesTable } from '@/components/deliveries/DeliveriesTable';
import * as DeliveryStyle from '@/assets/styles/components/Delivery.scss';

interface ListDeliveriesPageState {
  title: string,
};

export default class ListDeliveriesPage extends React.Component<{}, ListDeliveriesPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: 'Deliveries',
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
          <DeliveriesTable />
        </Container>
      </React.Fragment>
    );
  };
};
