import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Student, Group, studentService, groupService, programService } from './services';
import { Alert, Card, Row, Column, NavBar, Button, Form } from './widgets';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <NavBar brand="StudAdm">
        <NavBar.Link exact to="/" activeStyle={{ color: 'darkblue' }}>
          StudAdm
        </NavBar.Link>{' '}
        <NavBar.Link to="/students" activeStyle={{ color: 'darkblue' }}>
          Students
        </NavBar.Link>{' '}
        <NavBar.Link to="/groups" activeStyle={{ color: 'darkblue' }}>
          Student Groups
        </NavBar.Link>
      </NavBar>
    );
  }
}

interface State {
  programs: any[];
}

class Home extends Component {
  state: State = {
    programs: [],
  };

  render() {
    const { programs } = this.state;

    return (
      <Card title="Welcome to Student Administration">
        {programs?.map(
          (
            program: {
              program:
                | string
                | number
                | boolean
                | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
              code: any;
              students: {
                id: React.Key | null | undefined;
                name:
                  | string
                  | number
                  | boolean
                  | React.ReactFragment
                  | React.ReactPortal
                  | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                  | null
                  | undefined;
              }[];
            },
            index: any
          ) => (
            <Card key={index}>
              <h3>{program.program}</h3>
              Navn: {program.program} <br />
              Kode: {program.code} <br />
              Studenter:
              <ul>
                {program.students?.map(
                  (student: {
                    id: React.Key | null | undefined;
                    name:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                      | React.ReactFragment
                      | React.ReactPortal
                      | null
                      | undefined;
                  }) => (
                    <li key={student.id}>{student.name}</li>
                  )
                )}
              </ul>
            </Card>
          )
        )}
      </Card>
    );
  }

  componentDidMount() {
    programService.getPrograms((programs) => {
      const programsWithStudents: { program: string; code: string; students: Student[] }[] = [];

      programs.forEach((program) => {
        programService.getStudents(program.code, (students) => {
          const programWithStudents = {
            program: program.program,
            code: program.code,
            students: students,
          };
          programsWithStudents.push(programWithStudents);
          if (programsWithStudents.length === programs.length) {
            this.setState({ programs: programsWithStudents });
          }
        });
      });
    });
  }
}


class StudentList extends Component {
  students: Student[] = [];

  render() {
    return (
      <div>
        <Card title="Students">
          {this.students.map((student) => (
            <Row key={student.id}>
              <Column>
                <NavBar.Link to={'/students/' + student.id}>{student.name}</NavBar.Link>
              </Column>
            </Row>
          ))}
        </Card>
        <Button.Success onClick={this.add}>New student</Button.Success>
      </div>
    );
  }

  mounted() {
    studentService.getStudents((students) => {
      this.students = students;
    });
  }

  add() {
    history.push('/student_new');
  }
}

class StudentDetails extends Component<{ match: { params: { id: string } } }> {
  student = new Student();
  groupName: string = '';
  props: any;

  render() {
    return (
      <div>
        <Card title="Student details">
          <Row>
            <Column width={2}>Name:</Column>
            <Column>{this.student.name}</Column>
          </Row>
          <Row>
            <Column width={2}>Email:</Column>
            <Column>{this.student.email}</Column>
          </Row>
          <Row>
            <Column width={2}>Program:</Column>
            <Column>
              {this.student.program} ({this.student.code})
            </Column>
          </Row>
          <Row>
            <Column width={2}>Group:</Column>
            <Column>{this.groupName}</Column>
          </Row>
        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
        <Button.Danger onClick={this.delete}>Delete Student</Button.Danger>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(Number(this.props.match.params.id), (student) => {
      this.student = student;
      groupService.getGroup(this.student.group_id, (group) => {
        this.groupName = group.name;
      });
    });
  }

  edit() {
    history.push('/students/' + this.student.id + '/edit');
  }

  delete() {
    studentService.deleteStudent(Number(this.props.match.params.id), () =>
      history.push('/students')
    );
  }
}

class StudentEdit extends Component<{ match: { params: { id: string } } }> {
  props: any;
  student = new Student();
  groups: Group[] = [];

  updateCode = (program: string) => {
    switch (program) {
      case 'Digital forretningsutvikling':
        this.student.code = 'ITBAITBEDR';
        break;
      case 'Digital infrastruktur og cybersecurity':
        this.student.code = 'BDIGSEC';
        break;
      case 'Dataingeniør':
        this.student.code = 'BIDATA';
        break;
      default:
        this.student.code = '';
        break;
    }
  };

  render() {
    return (
      <div>
        <Card title="Edit student">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.name}
            onChange={(event: { currentTarget: { value: string } }) =>
              (this.student.name = event.currentTarget.value)
            }
          />
          <Form.Label>Email:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.email}
            onChange={(event: { currentTarget: { value: string } }) =>
              (this.student.email = event.currentTarget.value)
            }
          />
          <Form.Label>Program:</Form.Label>
          <Form.Select
            value={this.student.program}
            onChange={(event: { currentTarget: { value: string } }) => {
              this.student.program = event.currentTarget.value;
              this.updateCode(event.currentTarget.value);
            }}
          >
            <option value="" key="">
              Choose a program
            </option>
            <option value="Digital forretningsutvikling">Digital forretningsutvikling</option>
            <option value="Digital infrastruktur og cybersecurity">
              Digital infrastruktur og cybersecurity
            </option>
            <option value="Dataingeniør">Dataingeniør</option>
          </Form.Select>
          <Form.Label>
            Code:
            <Form.Input type="text" value={this.student.code} readOnly />
          </Form.Label>
          <Form.Label>Group:</Form.Label>
          <Form.Select
            value={this.student.group_id}
            onChange={(event: { currentTarget: { value: number } }) =>
              (this.student.group_id = event.currentTarget.value)
            }
          >
            {this.groups.map((group) => (
              <option key={group.id} value={group.group_id}>
                {group.name} (gr.{group.group_id})
              </option>
            ))}
          </Form.Select>
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(Number(this.props.match.params.id), (student) => {
      this.student = student;
    });
    groupService.getGroups((groups) => (this.groups = groups));
  }

  save() {
    studentService.updateStudent(this.student, () => {
      history.push('/students/' + this.props.match.params.id);
    });
  }

  cancel() {
    history.push('/students/' + this.props.match.params.id);
  }
}

class StudentNew extends Component {
  student = new Student();
  groups: Group[] = [];

  updateCode = (program: string) => {
    switch (program) {
      case 'Digital forretningsutvikling':
        this.student.code = 'ITBAITBEDR';
        break;
      case 'Digital infrastruktur og cybersecurity':
        this.student.code = 'BDIGSEC';
        break;
      case 'Dataingeniør':
        this.student.code = 'BIDATA';
        break;
      default:
        this.student.code = '';
        break;
    }
  };

  render() {
    return (
      <div>
        <Card title="New student">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.name}
            onChange={(event: { currentTarget: { value: string } }) =>
              (this.student.name = event.currentTarget.value)
            }
          />
          <Form.Label>Email:</Form.Label>
          <Form.Input
            type="text"
            value={this.student.email}
            onChange={(event: { currentTarget: { value: string } }) =>
              (this.student.email = event.currentTarget.value)
            }
          />
          <Form.Label>Program:</Form.Label>
          <Form.Select
            value={this.student.program}
            onChange={(event: { currentTarget: { value: string } }) => {
              this.student.program = event.currentTarget.value;
              this.updateCode(event.currentTarget.value);
            }}
          >
            <option value="" key="">
              Choose a program
            </option>
            <option value="Digital forretningsutvikling">Digital forretningsutvikling</option>
            <option value="Digital infrastruktur og cybersecurity">
              Digital infrastruktur og cybersecurity
            </option>
            <option value="Dataingeniør">Dataingeniør</option>
          </Form.Select>
          <Form.Label>
            Code:
            <Form.Input type="text" value={this.student.code} readOnly />
          </Form.Label>
          <Form.Label>Group:</Form.Label>
          <Form.Select
            value={this.student.group_id}
            onChange={(event: { currentTarget: { value: number } }) =>
              (this.student.group_id = event.currentTarget.value)
            }
          >
            {this.groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </Form.Select>
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.add.bind(this)}>Add</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    groupService.getGroups((groups) => (this.groups = groups));
  }

  add() {
    studentService.addStudent(this.student, (id) => {
      history.push('/students/' + id);
    });
  }

  cancel() {
    history.push('/students');
  }
}

class StudentGroups extends Component {
  groups: Group[] = [];

  render() {
    return (
      <Card title="Groups">
        {this.groups.map((group) => (
          <Row key={group.group_id}>
            <Column>
              <NavBar.Link to={'/groups/' + group.group_id}>
                {group.name} (gr.{group.group_id})
              </NavBar.Link>
            </Column>
          </Row>
        ))}
        <Button.Success type="button" onClick={this.add}>
          New Group
        </Button.Success>
      </Card>
    );
  }

  mounted() {
    groupService.getGroups((groups) => {
      this.groups = groups;
    });
  }

  add() {
    history.push('/group_new');
  }
}

class GroupDetails extends Component<{ match: { params: { id: string } } }> {
  group = new Group();
  students: Student[] = [];
  leader = new Student();
  studentsWithoutGroup: any[] = [];
  props: any;

  render() {
    return (
      <div>
        <Card title="Group details">
          <h4>Group nr.{this.group.group_id}</h4>
          <Row>
            <Column width={3}>Name:</Column>
            <Column>{this.group.name}</Column>
          </Row>
          <Row>
            <Column width={3}>Description:</Column>
            <Column>{this.group.description}</Column>
          </Row>
          <Row>
            <Column width={3}>Image:</Column>
            <Column>
              <img src={this.group.img} width="200px" />
            </Column>
          </Row>
          <Row>
            <Column width={3}>Leader:</Column>
            <Column>{this.leader.name}</Column>
          </Row>

          <Row>
            <Column width={3}>Students:</Column>
            <Column>
              {this.students.map((student) => (
                <Row key={student.id}>
                  <Column>
                    {student.name} ({student.code})
                  </Column>
                </Row>
              ))}
            </Column>
          </Row>
          <Row>
            <Column width={20}>
              {this.studentsWithoutGroup.map((student) => (
                <Row key={student.id}>
                  <Column>
                    {student.name}{' '}
                    <Button.Success type="button" onClick={() => this.add(student.id)}>
                      +
                    </Button.Success>
                  </Column>
                </Row>
              ))}
            </Column>
          </Row>
        </Card>
        <Row>
          <Column>
            <Button.Light onClick={this.edit}>Edit</Button.Light>
          </Column>
          <Column right>
            <Button.Danger onClick={this.delete}>Delete</Button.Danger>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    groupService.getGroup(this.props.match.params.group_id, (group) => {
      this.group = group;
      studentService.getStudent(this.group.leader, (student) => {
        if (student) this.leader = student;
      });
    });
    groupService.getStudents(
      this.props.match.params.group_id,
      (students) => (this.students = students)
    );
    groupService.getStudentsWithoutGroup(
      this.props.match.params.group_id,
      (students) => (this.studentsWithoutGroup = students)
    );
  }

  delete() {
    groupService.deleteGroup(this.props.match.params.group_id, () => history.push('/groups'));
  }

  edit() {
    history.push('/groups/' + this.group.group_id + '/edit');
  }

  add(studentId: number) {
    groupService.addStudent(this.props.match.params.group_id, studentId, () => {
      console.log('studentId ' + studentId);
      this.updateStudentsAndStudentsWithoutGroup();
    });
  }

  updateStudentsAndStudentsWithoutGroup() {
    groupService.getStudentsWithoutGroup(
      this.props.match.params.group_id,
      (students) => (this.studentsWithoutGroup = students)
    );
    groupService.getStudents(
      this.props.match.params.group_id,
      (students) => (this.students = students)
    );
  }
}

class GroupEdit extends Component<{ match: { params: { id: string } } }> {
  group = new Group();
  students: Student[] = [];
  props: any;

  render() {
    return (
      <div>
        <Card title="Edit group">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.group.name}
            onChange={(event: { currentTarget: { value: string } }) =>
              (this.group.name = event.currentTarget.value)
            }
          />
          <Form.Label>Description:</Form.Label>
          <Form.TextArea
            rows={5}
            value={this.group.description}
            onChange={(event: { currentTarget: { value: string } }) =>
              (this.group.description = event.currentTarget.value)
            }
          />
          <Form.Label>Image:</Form.Label>
          <Form.Input
            type="text"
            value={this.group.img}
            src={this.group.img}
            onChange={(event: { currentTarget: { value: string } }) =>
              (this.group.img = event.currentTarget.value)
            }
          />
          <Form.Label>Leader:</Form.Label>
          <Form.Select
            value={this.group.leader}
            onChange={(event: { currentTarget: { value: any } }) =>
              (this.group.leader = Number(event.currentTarget.value))
            }
          >
            <option></option>
            {this.students?.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </Form.Select>
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    groupService.getGroup(
      Number(this.props.match.params.group_id),
      (group) => (this.group = group)
    );
    groupService.getStudents(
      Number(this.props.match.params.group_id),
      (students) => (this.students = students)
    );
  }

  save() {
    groupService.updateGroup(this.group, () => {
      history.push('/groups/' + this.props.match.params.group_id);
    });
  }

  cancel() {
    history.push('/groups/' + this.props.match.params.group_id);
  }
}

class GroupNew extends Component {
  group = new Group();

  render() {
    return (
      <div>
        <Card title="New group">
          <Form.Label>Name:</Form.Label>
          <Form.Input
            type="text"
            value={this.group.name}
            onChange={(event: { currentTarget: { value: string } }) =>
              (this.group.name = event.currentTarget.value)
            }
          />
          <Form.Label>Description:</Form.Label>
          <Form.TextArea
            rows={5}
            value={this.group.description}
            onChange={(event: { currentTarget: { value: string } }) =>
              (this.group.description = event.currentTarget.value)
            }
          />
          <Form.Label>Image:</Form.Label>
          <Form.Input
            type="text"
            value={this.group.img}
            onChange={(event: { currentTarget: { value: string } }) =>
              (this.group.img = event.currentTarget.value)
            }
          />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.add}>Add</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  add() {
    groupService.addGroup(this.group, (group_id) => {
      history.push('/groups/' + group_id);
    });
  }

  cancel() {
    history.push('/groups');
  }
}

let root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <div>
      <Alert />
      <HashRouter>
        <Menu />
        <Route exact path="/" component={Home} />
        <Route exact path="/students" component={StudentList} />
        <Route exact path="/students/:id" component={StudentDetails} />
        <Route exact path="/students/:id/edit" component={StudentEdit} />
        <Route exact path="/student_new" component={StudentNew} />
        <Route exact path="/groups" component={StudentGroups} />
        <Route exact path="/group_new" component={GroupNew} />
        <Route exact path="/groups/:group_id" component={GroupDetails} />
        <Route exact path="/groups/:group_id/edit" component={GroupEdit} />
      </HashRouter>
    </div>
  );
