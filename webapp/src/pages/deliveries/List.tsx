import * as React from 'react';
import Container from '@material-ui/core/Container';
import { Header } from '@/components/Header';

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
          {this.state.title}
        </Container>
      </React.Fragment>
    );
  };
};
