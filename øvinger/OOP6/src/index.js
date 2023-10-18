import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div className="mb-6 px-12 flex space-x-4 text-blue-600">
        CV:
        <NavLink to="/">Hjemmeside</NavLink> <NavLink to="/utdanning">Utdanning</NavLink>{' '}
        <NavLink to="/arbeidserfaring">Arbeidserfaring</NavLink>{' '}
        <NavLink to="/interesser">Interesser</NavLink>
      </div>
    );
  }
}

class Info extends Component {
  render() {
    return (
      <div className="flex items-center space-x-12">
        <div className="max-w-[12%] w-full">
          <h1 className="font-medium">{this.props.item.title}</h1>
          <p className="text-gray-400 text-sm">{this.props.item.years}</p>
        </div>
        <div className="max-w-[5%] w-full">
          <h1>{this.props.item.place}</h1>
        </div>
        <div>
          <h1>{this.props.item.info}</h1>
          <p className="text-gray-400 text-sm">{this.props.item.type}</p>
        </div>
      </div>
    );
  }
}

class Info2 extends Component {
  render() {
    return (
      <div className="flex items-center space-x-12">
        <div className="max-w-[10%] w-full">
          <h1 className="font-medium">{this.props.item.stilling}</h1>
          <p className="text-gray-400 text-sm">{this.props.item.bedrift}</p>
        </div>
        <div className="max-w-[10%] w-full">
          <h1>{this.props.item.andel}</h1>
          <p className="text-gray-400 text-sm">{this.props.item.periode}</p>
        </div>
        <div>
          <h1>{this.props.item.sted}</h1>
        </div>
        <div>
          <h1>{this.props.item.info}</h1>
        </div>
      </div>
    );
  }
}

class Hjemmeside extends Component {
  render() {
    return (
      <b>
        <h1>Velkommen til min CV!</h1>
      </b>
    );
  }
}

class Utdanning extends Component {
  utdanning = [
    {
      title: 'Videregående skole',
      place: 'KVT',
      info: 'Samfunn og ledelse',
      years: '2017-2020',
    },
    {
      title: 'Universitet',
      place: 'NTNU',
      info: 'Filosofi',
      type: 'Årsstudium',
      years: '2020-2021',
    },
    {
      title: 'Universitet',
      place: 'NTNU',
      info: 'Digital Forretningsutvikling',
      type: 'Bachelorgrad',
      years: '2022-',
    },
  ];

  render() {
    return (
      <div className="space-y-4">
        {this.utdanning.map((item, index) => {
          return <Info key={index} item={item} />;
        })}
      </div>
    );
  }
}

class Arbeidserfaring extends Component {
  arbeidserfaring = [
    {
      stilling: 'Cafemedarbeider',
      bedrift: 'Frøken Lovise AS',
      andel: 'Heltid',
      sted: 'Sandnessjøen',
      periode: 'Juni-August 2021',
    },
    {
      stilling: 'Butikkmedarbeider',
      bedrift: 'Jernia Detaljhandel AS',
      andel: 'Deltid',
      sted: 'Trondheim',
      periode: 'August 2021 - Mars 2022',
    },
    {
      stilling: 'Cafemedarbeider',
      bedrift: 'St.Olavs Hospital',
      andel: 'Deltid',
      sted: 'Trondheim',
      periode: 'August 2021 - Mars 2022',
    },
    {
      stilling: 'Cafemedarbeider',
      bedrift: 'St.Olavs Hospital',
      andel: 'Heltid',
      sted: 'Trondheim',
      periode: 'Mars 2022 - August 2022',
    },
  ];

  render() {
    return (
      <div className="space-y-4">
        {this.arbeidserfaring.map((item, index) => {
          return <Info2 key={index} item={item} />;
        })}
      </div>
    );
  }
}

class Interesser extends Component {
  render() {
    return (
      <div className="space-y-4">
        <b>Interesser</b>
        <br />
        <li>Cavasøndag</li>
        <li>Trening/Aktivitet</li>
        <li>Stå på ski</li>
        <li>Se serie</li>
        <li>Lage mat</li>
      </div>
    );
  }
}

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Hjemmeside} />
      <Route path="/utdanning" component={Utdanning} />
      <Route path="/arbeidserfaring" component={Arbeidserfaring} />
      <Route path="/interesser" component={Interesser} />
    </div>
  </HashRouter>
);
