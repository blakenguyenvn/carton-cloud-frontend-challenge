import * as React from 'react';
import Container from '@material-ui/core/Container';
import { Header } from '@/components/Header';

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
          {this.state.title}
        </Container>
      </React.Fragment>
    );
  };
};
