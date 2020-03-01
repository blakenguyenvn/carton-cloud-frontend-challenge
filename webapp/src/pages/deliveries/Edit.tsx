import * as React from 'react';
import Container from '@material-ui/core/Container';
import { Header } from '@/components/Header';

interface EditDeliveryPageState {
  title: string,
};

export default class EditDeliveryPage extends React.Component<{}, EditDeliveryPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: 'Edit Delivery',
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
