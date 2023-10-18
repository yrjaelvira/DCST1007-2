import { pool } from './mysql-pool';

class StudentService {
  getStudents(success) {
    pool.query('SELECT * FROM Students', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getStudent(id, success) {
    pool.query('SELECT * FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateStudent(student, success) {
    pool.query(
      'UPDATE Students SET name=?, email=? WHERE id=?',
      [student.name, student.email, student.id],
      (error, results) => {
        if (error) return console.error(error);

        success();
      }
    );
  }

  deleteStudent( id, success) {
    pool.query('DELETE FROM Students WHERE id=?', [id], (error, results) => {
      if (error) return console.error(error);

      console.log("deleting student " + id)
      success(results[0]);
    });
  }
}
export let studentService = new StudentService();

class StudyProgramService {
  getPrograms(success) {
    pool.query('SELECT DISTINCT program, code FROM Students', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }

  getProgram(code, success) {
    pool.query('SELECT * FROM Students WHERE code = ?', [code], (error, results) => {
      if (error) return console.error(error); // If error, show error in console (in red text) and return
      
      const program = results[0] ? results[0].program : null;
      success([program, results]);
      // success(results);
    });
  }

  updateProgram(program, code) {

    pool.query('UPDATE Students SET program=?, code=? WHERE code=?',
    [program.program, code, program.code],
    (error, results) => {
      if (error) return console.error(error);
      console.log(program.code)
      // const program = results[0] ? results[0].program : null;

    })
  }

  deleteProgram(code, success) {
    pool.query('DELETE FROM Students WHERE code = ?', [code], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let programService = new StudyProgramService();
