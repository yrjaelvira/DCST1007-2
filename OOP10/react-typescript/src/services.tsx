import { pool } from './mysql-pool';
import type { RowDataPacket, ResultSetHeader } from 'mysql2';

export class Student {
  id: number = 0;
  name: string = '';
  email: string = '';
  program: string = '';
  code: string = '';
  group_id: number = 0;
}

class StudentService {
  getStudents(success: (students: Student[]) => void) {
    pool.query('select * from StudentTable', (error: any, results: Student[]) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getStudent(id: number, success: (student: Student) => void) {
    pool.query(
      'SELECT * FROM StudentTable WHERE id=?',
      [id],
      (error: any, results: RowDataPacket[]) => {
        if (error) return console.error(error);

        success(results[0] as Student);
      }
    );
  }

  updateStudent(student: Student, success: () => void) {
    pool.query(
      'UPDATE StudentTable SET name=?, email=?, program=?, code=?, group_id=? WHERE id=?',
      [student.name, student.email, student.program, student.code, student.group_id, student.id],
      (error: any) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  addStudent(student: Student, success: (insertId: number) => void) {
    pool.query(
      'INSERT INTO StudentTable (name, email, program, code, group_id) VALUES (?, ?, ?, ?, ?)',
      [student.name, student.email, student.program, student.code, student.group_id],
      (error: any, results: any) => {
        if (error) return console.error(error);

        success(results.insertId);
      }
    );
  }

  deleteStudent(id: number, success: () => void) {
    pool.query('DELETE FROM StudentTable WHERE id=?', [id], (error: any) => {
      if (error) return console.error(error);

      success();
    });
  }
}

export class Group {
  group_id: number = 0;
  name: string = '';
  leader: number = 0;
  description: string = '';
  img: string = '';
  id: number | undefined | string;
}

class GroupService {
  getGroups(success: (groups: Group[]) => void) {
    pool.query('SELECT * FROM StudentGroup', (error: any, results: Group[]) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getGroup(group_id: number, success: (group: Group) => void) {
    pool.query(
      'SELECT * FROM StudentGroup WHERE group_id=?',
      [group_id],
      (error: any, results: any) => {
        if (error) return console.error(error);

        success(results[0]);
      }
    );
  }

  getStudents(group_id: number, success: (student: Student[]) => void) {
    pool.query(
      'SELECT * FROM StudentTable WHERE group_id = ?',
      [group_id],
      (error: any, results: any) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  updateGroup(group: Group, success: () => void) {
    pool.query(
      'UPDATE StudentGroup SET name=?, leader=?, description=?, img=?  WHERE group_id=?',
      [group.name, group.leader, group.description, group.img, group.group_id],
      (error: any) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  addGroup(group: Group, success: (insertId: number) => void) {
    pool.query(
      'INSERT INTO StudentGroup (name, leader, description, img) VALUES (?, 0, ?, ?)',
      [group.name, group.leader, group.description, group.img],
      (error: any, results: any) => {
        if (error) return console.error(error);

        success(results.insertId);
      }
    );
  }

  deleteGroup(group_id: number, success: () => void) {
    pool.query('DELETE FROM StudentGroup WHERE group_id=?', [group_id], (error: any) => {
      if (error) return console.error(error);

      success();
    });
  }

  getStudentsWithoutGroup(group_id: number, success: (groups: Group[]) => void) {
    pool.query(
      'SELECT id, name FROM StudentTable WHERE group_id IS NULL',
      (error: any, results: Group[]) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }

  addStudent(group_id: number, id: number, success: (affectedRows: number) => void) {
    pool.query(
      'UPDATE StudentTable SET group_id=? WHERE id=?',
      [group_id, id],
      (error: any, results: any) => {
        if (error) return console.error(error);

        success(results.affectedRows);
      }
    );
  }
}

class StudyProgramService {
  getPrograms(success: (students: Student[]) => void) {
    pool.query(
      'SELECT DISTINCT program, code FROM StudentTable',
      (error: any, results: Student[]) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }

  getProgram(code: string, success: (students: Student[]) => void) {
    pool.query('SELECT * FROM StudentTable WHERE code = ?', [code], (error: any, results: any) => {
      if (error) return console.error(error);

      const students = results.map((result: { id: any; name: any }) => {
        return { id: result.id, name: result.name };
      });

      success(students);
    });
  }

  getStudents(code: string, success: (students: Student[]) => void) {
    pool.query(
      'SELECT id, name FROM StudentTable WHERE code=?',
      [code],
      (error: any, results: any) => {
        if (error) return console.error(error);

        const students = results.map((result: { id: any; name: any }) => {
          return { id: result.id, name: result.name };
        });

        success(students);
      }
    );
  }
}

export let groupService = new GroupService();
export let studentService = new StudentService();
export let programService = new StudyProgramService();
