import React from 'react';
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
      branchName: 'Carton Cloud',
      menu: [
        { title: 'Deliveries', path: '/' },
        { title: 'New Delivery', path: '/deliveries/new' },
      ]
    };
	};

  render() {
    return (
      <header className="header">
        <Typography className="page-title" variant="h6" noWrap>
            {this.state.branchName}
        </Typography>
        <ul>
          {this.state.menu.map((item: any, index: number) => (
            <li key={item.path}>
              <Link to={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </header>
    );
  }
};
