import { pool } from './mysql-pool';

class StudentService {
  getStudents(success) {
    pool.query('SELECT * FROM StudentTable', (error, results) => {
      if (error) return console.error(error);

      success(results);
      // success();
    });
  }

  getStudent(id, success) {
    pool.query('SELECT * FROM StudentTable WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateStudent(student, success) {
    pool.query(
      'UPDATE StudentTable SET name=?, email=?, program=?, code=?, group_id=? WHERE id=?',
      [student.name, student.email, student.program, student.code, student.group_id, student.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  addStudent(student, success) {
    pool.query(
      'INSERT INTO StudentTable (name, email, program, code, group_id) VALUES (?, ?, ?, ?, ?)',
      [student.name, student.email, student.program, student.code, student.group_id],
      (error, results) => {
        if (error) return console.error(error);

        success(results.insertId);
      }
    );
  }

  deleteStudent(id, success) {
    pool.query('DELETE FROM StudentTable WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}

class GroupService {
  getGroups(success) {
    pool.query('SELECT * FROM StudentGroup', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getGroup(group_id, success) {
    pool.query('SELECT * FROM StudentGroup WHERE group_id=?', [group_id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  getStudents(group_id, success) {
    pool.query('SELECT * FROM StudentTable WHERE group_id=?', [group_id], (error, results) => {
      if (error) return console.error(error); // If error, show error in console (in red text) and return

      success(results);
    });
  }

  updateGroup(group, success) {
    pool.query(
      'UPDATE StudentGroup SET name=?, leader=?, description=?, img=?  WHERE group_id=?',
      [group.name, group.leader, group.description, group.img, group.group_id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  addGroup(group, success) {
    pool.query(
      'INSERT INTO StudentGroup (name, leader, description, img) VALUES (?, 0, ?, ?)',
      [group.name, group.leader, group.description, group.img],
      (error, results) => {
        if (error) return console.error(error);

        success(results.insertId);
        // success(results);
      }
    );
  }

  deleteGroup(group_id, success) {
    pool.query('DELETE FROM StudentGroup WHERE group_id=?', [group_id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }


  getStudentsWithoutGroup(group_id, success) {
    pool.query('SELECT id, name FROM StudentTable WHERE group_id IS NULL', (error, results) => {
      if (error) return console.error(error);
  
      success(results);
    });
  }

  addStudent(group_id, id, success) {
    pool.query(
      'UPDATE StudentTable SET group_id=? WHERE id=?',
      [group_id, id],
      (error, results) => {
        if (error) return console.error(error);
  
        success(results.affectedRows);
      }
    );
  }
}

class StudyProgramService {
  getPrograms(success) {
    pool.query('SELECT DISTINCT program, code FROM StudentTable', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }

  getProgram(code, success) {
    pool.query('SELECT * FROM StudentTable WHERE code = ?', [code], (error, results) => {
      if (error) return console.error(error);

      const students = results.map((result) => {
        return { id: result.id, name: result.name };
      });

      success(students);
    });
  }

  getStudents(code, success) {
    pool.query('SELECT id, name FROM StudentTable WHERE code=?', [code], (error, results) => {
      if (error) return console.error(error);

      const students = results.map((result) => {
        return { id: result.id, name: result.name };
      });

      success(students);
    });
  }
}

export let groupService = new GroupService();
export let studentService = new StudentService();
export let programService = new StudyProgramService();
