import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { pool } from './mysql-pool';

class Menu extends Component {
  render() {
    return (
      <div>
        <NavLink exact to="/" activeStyle={{ color: 'darkblue' }}>
          StudAdm
        </NavLink>{' '}
        <NavLink to="/students" activeStyle={{ color: 'darkblue' }}>
          Students
        </NavLink>{' '}
        <NavLink to="/program" activeStyle={{ color: 'darkblue' }}>
          Study programs
        </NavLink>
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to StudAdm</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.name} onChange={this.handleNameChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" value={this.state.email} onChange={this.handleEmailChange} />
          </label>
          <br />
          <label>
            Program:
            <select value={this.state.program} onChange={this.handleProgramChange}>
              <option value="">Choose a program</option>
              <option value="Digital forretningsutvikling">Digital forretningsutvikling</option>
              <option value="Digital infrastruktur og cybersecurity">
                Digital infrastruktur og cybersecurity
              </option>
              <option value="Dataingeniør">Dataingeniør</option>
            </select>
          </label>
          <br />
          <label>
            Code:
            <input type="text" value={this.state.code} readOnly />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      program: '',
      code: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleProgramChange = this.handleProgramChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleProgramChange(event) {
    const program = event.target.value;
    this.setState({ program: program });

    switch (program) {
      case 'Digital forretningsutvikling':
        this.setState({ code: 'ITBAITBEDR' });
        break;
      case 'Digital infrastruktur og cybersecurity':
        this.setState({ code: 'BDIGSEC' });
        break;
      case 'Dataingeniør':
        this.setState({ code: 'BIDATA' });
        break;
      default:
        this.setState({ code: '' });
        break;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, email, program, code } = this.state;

    pool.query(
      'INSERT INTO Students (name, email, program, code) VALUES (?, ?, ?, ?)',
      [name, email, program, code],
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Student added successfully');
          this.setState({ name: '', email: '', program: '', code: '' });
        }
      }
    );
  }
}

class StudentList extends Component {
  students = [];

  render() {
    return (
      <div>
        <h1>Studenter</h1>
        <ul>
          {this.students.map((student) => (
            <li key={student.id}>
              <NavLink activeStyle={{ color: 'green' }} to={'/students/' + student.id}>
                {student.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  mounted() {
    pool.query('SELECT * FROM Students', (error, results) => {
      if (error) return console.error(error); // If error, show error in console (in red text) and return

      this.students = results;
    });
  }
}

class StudentDetails extends Component {
  student = null;

  render() {
    if (!this.student) return <div>Please wait...</div>;

    return (
      <ul>
        <li>Name: {this.student.name}</li>
        <li>Email: {this.student.email}</li>
        <li>
          Studieprogram: {this.student.program} ({this.student.code})
        </li>
      </ul>
    );
  }

  mounted() {
    pool.query(
      'SELECT * FROM Students WHERE id=?',
      [this.props.match.params.id],
      (error, results) => {
        if (error) return console.error(error); // If error, show error in console (in red text) and return

        this.student = results[0];
      }
    );
  }
}

class StudyProgram extends Component {
  state = {
    programs: [],
  };

  render() {
    return (
      <div>
        <h1>Studieprogram</h1>

        <ul>
          {this.state.programs.map((program) => (
            <li key={program.program}>
              <NavLink activeStyle={{ color: 'green' }} to={`/program/${program.code}`}>
                {program.program}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  mounted() {
    pool.query('SELECT DISTINCT program, code FROM Students', (error, results) => {
      if (error) return console.error(error);
      this.setState({ programs: results });
    });
  }
}

class ProgramDetails extends Component {
  state = {
    program: null,
    students: [],
  };

  render() {
    if (!this.state.program) return <div>Please wait...</div>;

    return (
      <div>
        <h2>Hello, {this.state.program.code} students!</h2>
        Navn: {this.state.program.program} <br />
        {console.log(this.state.students)}
        Kode: {this.state.program.code} <br />
        Studenter:
        <ul>
          {this.state.students.map((student) => (
            <li key={student.id}>
              {student.name} ({student.email})
            </li>
          ))}
        </ul>
      </div>
    );
  }

  mounted() {
    const { code } = this.props.match.params;
    console.log(code);
    pool.query('SELECT * FROM Students WHERE code = ?', [code], (error, results) => {
      if (error) return console.error(error); // If error, show error in console (in red text) and return

      const program = results[0] ? results[0].program : null;
      console.log(program, code, results);
      this.setState({
        program: { program, code },
        students: results,
      });
    });
  }
}

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route path="/students/" component={StudentList} />
      <Route path="/students/:id" component={StudentDetails} />
      <Route path="/program" component={StudyProgram} />
      <Route path="/program/:code" component={ProgramDetails} />
    </div>
  </HashRouter>
);
