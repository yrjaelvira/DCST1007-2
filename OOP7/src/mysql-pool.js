import mysql from 'mysql2';

// Create a pool of connections to the mysql server.
// Read more about connection pools here: https://en.wikipedia.org/wiki/Connection_pool
export let pool = mysql.createPool({
  host: 'mysql-ait.stud.idi.ntnu.no',
  connectionLimit: 1, // Limit the number of simultaneous connections to avoid overloading the mysql server
  user: 'yekibsga', // Replace "username" with your mysql-ait.stud.idi.ntnu.no username
  password: 'MJg1fvEKH', // Replae "password" with your mysql-ait.stud.idi.ntnu.no password
  database: 'yekibsga', // Replace "username" with your mysql-ait.stud.idi.ntnu.no username
});
