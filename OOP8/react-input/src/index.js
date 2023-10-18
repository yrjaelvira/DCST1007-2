import * as React from 'react';
import { pool } from './mysql-pool';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { studentService } from './services';
import { createHashHistory } from 'history';
import { programService } from './services';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

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
    studentService.getStudents((students) => {
      this.students = students;
    });
  }
}

class StudentDetails extends Component {
  student = null;

  render() {
    if (!this.student) return <div>Please wait...</div>;

    return (
      <div>
        <div>
          <h3>Studentdetails</h3>

          <ul>
            <li>Name: {this.student.name}</li>
            <li>Email: {this.student.email}</li>
            <li>
              Studieprogram: {this.student.program} ({this.student.code})
            </li>
          </ul>
        </div>
        <button type="button" onClick={this.edit}>
          Edit
        </button>
        <button type="button" onClick={this.delete}>
          Delete
        </button>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, (student) => {
      this.student = student;
    });
  }

  edit() {
    history.push('/students/' + this.student.id + '/edit');
  }

  delete() {
    studentService.deleteStudent(this.props.match.params.id, (student) => {
      this.student = student;
      history.push('/students');

      console.log("student successfully deleted")
    });
  }
}

class StudentEdit extends Component {
  student = null;

  render() {
    if (!this.student) return <div>Loading students...</div>;

    return (
      <div>
        <h3>Change student details</h3>
        Name:{' '}
        <input
          type="text"
          value={this.student.name}
          onChange={(event) => (this.student.name = event.currentTarget.value)}
        />{' '}
        <br />
        Email:{' '}
        <input
          type="text"
          value={this.student.email}
          onChange={(event) => (this.student.email = event.currentTarget.value)}
        />{' '}
        <br />
        Studieprogram:{' '}
        <label>
          Program:
          <select
            value={this.student.program}
            onChange={(event) => (this.student.program = event.currentTarget.value)}
          >
            <option value="">Choose a program</option>
            <option value="Digital forretningsutvikling">Digital forretningsutvikling</option>
            <option value="Digital infrastruktur og cybersecurity">
              Digital infrastruktur og cybersecurity
            </option>
            <option value="Dataingeniør">Dataingeniør</option>
          </select>
        </label>
        <button type="button" onClick={this.save}>
          Save
        </button>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, (student) => {
      this.student = student;
    });
  }

  save() {
    studentService.updateStudent(this.student, () => {
      history.push('/students');
    });
  }

}

class StudyProgram extends Component {
  programs = [];

  render() {
    return (
      <div>
        <h1>Studieprogram</h1>

        <ul>
          {this.programs?.map((program, index) => (
            <li key={index}>
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
    programService.getPrograms((results) => {
      this.programs = results;
    });
  }
}

class ProgramDetails extends Component {
  program = null;
  students = null;

  render() {
    if (!this.program) return <div>Loading programs...</div>;

    return (
      <div>
        <h2>Hello, {this.props.match.params.code} students!</h2>
        Navn: {this.program} <br />
        Kode: {this.props.match.params.code} <br />
        Studenter:
        <ul>
          {this.students?.map((student) => (
            <li key={student.id}>
              {student.name} ({student.email})
            </li>
          ))}
        </ul>
        <button type="button" onClick={this.edit}>
          Edit
        </button>
      </div>
    );
  }

  mounted() {
    programService.getProgram(this.props.match.params.code, (results) => {
      this.program = results[0];
      this.students = results[1];
    });
  }

  edit = () => {
    history.push('/program/' + this.props.match.params.code + '/edit');
  };
}

class ProgramEdit extends Component {
  program = null;
  students = [];
  student = null;
  code = this.props.match.params.code;

  render() {
    // console.log(program)
    if (!this.program) return <div>Please wait for editing page...</div>;

    return (
      <div>
        <h3>Change program details for "{this.program.program}"</h3>
        Name of program:{' '}
        <input
          type="text"
          value={this.program.program}
          onChange={(event) => (this.program.program = event.currentTarget.value)}
        />{' '}
        <br />
        Program code:{' '}
        <input
          type="text"
          value={this.code}
          onChange={(event) => (this.code = event.currentTarget.value)}
        />{' '}
        <br />
        Delete students from program:{' '}
        <ul>
          {this.students?.map((student) => (
            <li key={student.id}>
              <NavLink activeStyle={{ color: 'green' }} to={'/students/' + student.id}>
                {student.name}
              </NavLink>
              <button type="button" onClick={() => this.delete(student.id)}>
                x
              </button>
            </li>
          ))}
        </ul>
        Delete WHOLE program:{' '}
        <button type="button" onClick={this.deleteAll}>
          DELETE PROGRAM
        </button>{' '}
        <br />
        <button type="button" onClick={this.save}>
          Save
        </button>{' '}
        <br />
        <button type="button" onClick={this.cancel}>
          Cancel
        </button>{' '}
        <br />
      </div>
    );
  }

  mounted() {
    programService.getProgram(this.props.match.params.code, (results) => {
      this.program = results[1][0];
      this.students = results[1];
    });

  }

  delete(id) {
    // studentService.getStudent(this.props.match.params.id, (students) => {
    //   this.students = students;
    // })
    studentService.deleteStudent(id, (results) => {
      history.push('/program/' + this.code);
    });
  }

  deleteAll() {
    programService.deleteProgram(this.code, (results) => {
      this.program = results[0];

      console.log('Program deleted successfully');
      history.push('/program');
    });
  }

  save() {
    programService.updateProgram(this.program, this.code);
    history.push('/program/' + this.code);
  }

  cancel() {
    history.push('/program/' + this.code);
  }
}

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/students/" component={StudentList} />
      <Route exact path="/students/:id" component={StudentDetails} />
      <Route exact path="/students/:id/edit" component={StudentEdit} />
      <Route exact path="/program" component={StudyProgram} />
      <Route exact path="/program/:code" component={ProgramDetails} />
      <Route exact path="/program/:code/edit" component={ProgramEdit} />
    </div>
  </HashRouter>
);
