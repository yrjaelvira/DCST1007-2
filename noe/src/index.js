import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';

class Hello extends Component {
  //en komponent viser flere andre komponenter og html-element
  name = 'Kari';

  render() {
    //ikke så vanlig å ha variabel inni her. "Huskeregel"
    // let name = 'Kari';

    return (
      <>
        <b>Hello {this.props.name}</b>
        <br></br>
        <b>Hello {this.props.name}</b>
        <br></br>
      </>
      //props er tilknyttet den instansen eller objektet som har fått navnet Kari
    );
  }
}

import { NavLink, HashRouter, Route } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div>
        Menu:
        <NavLink to="/">Home</NavLink> <NavLink to="#/page1">Page 1</NavLink>{' '}
        <NavLink to="#/page2">Page 2</NavLink>
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return <div>Welcome to my app!</div>;
  }
}

class Page1 extends Component {
  render() {
    return <div>Page 1</div>;
  }
}

class Page2 extends Component {
  render() {
    return <div>Page 2</div>;
  }
}

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route path="/page1" component={Page1} />
      <Route path="/page2" component={Page2} />
    </div>

    <div>
      <p></p>
      <Hello name="Kari" />
      <Hello name="Per" />
    </div>
  </HashRouter>
);
