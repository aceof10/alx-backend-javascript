const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      try {
        const lines = data.trim().split('\n');
        if (lines.length <= 1) {
          throw new Error('Cannot load the database');
        }

        const students = lines.slice(1).filter((line) => line.trim() !== '');
        const totalStudents = students.length;
        console.log(`Number of students: ${totalStudents}`);

        const fields = {};
        students.forEach((student) => {
          const [firstname, , , field] = student.split(',');
          if (field in fields) {
            fields[field].push(firstname);
          } else {
            fields[field] = [firstname];
          }
        });

        Object.keys(fields).forEach((field) => {
          const count = fields[field].length;
          const list = fields[field].join(', ');
          console.log(`Number of students in ${field}: ${count}. List: ${list}`);
        });

        resolve();
      } catch (error) {
        reject(new Error('Cannot load the database'));
      }
    });
  });
}

module.exports = countStudents;
