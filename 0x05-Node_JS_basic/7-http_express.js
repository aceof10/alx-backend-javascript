const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

function countStudents(database) {
  return new Promise((resolve, reject) => {
    fs.readFile(database, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const students = lines.slice(1).map((line) => line.split(','));
      const studentCount = students.length;

      const fields = {};
      students.forEach(([firstName, , , field]) => {
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstName);
      });

      let output = `Number of students: ${studentCount}\n`;
      Object.entries(fields).forEach(([field, names]) => {
        output += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
      });

      resolve(output.trim());
    });
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  const database = path.resolve(process.argv[2] || '');
  res.write('This is the list of our students\n');

  try {
    const result = await countStudents(database);
    res.end(result);
  } catch (error) {
    res.end(error.message);
  }
});

app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

module.exports = app;
