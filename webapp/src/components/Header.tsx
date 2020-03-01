import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

interface HeaderState {
   branchName: string,
   menu: any
};

export class Header extends React.Component<{}, HeaderState> {
  constructor(props: any) {
		super(props);

    this.state = {
      branchName: 'CartonCloud',
      menu: [
        { title: 'Deliveries', path: '/' },
        { title: 'New Delivery', path: '/deliveries/new' },
      ]
    };
	};

  render() {
    return (
      <AppBar position="static">
        <Typography variant="h1" noWrap>
            {this.state.branchName}
        </Typography>
        <ul>
          {this.state.menu.map((item: any, index: number) => (
            <li key={item.path}>
              <Link to={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </AppBar>
    );
  }
};
