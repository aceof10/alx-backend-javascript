const http = require('http');
const fs = require('fs');

const countStudents = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n');
      const headers = lines.shift().split(',');
      const students = lines
        .map((line) => line.split(','))
        .filter((student) => student.length === headers.length);

      const fields = {};
      students.forEach((student) => {
        const field = student[3];
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(student[0]);
      });

      const results = [`Number of students: ${students.length}`];
      for (const [field, names] of Object.entries(fields)) {
        results.push(
          `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`,
        );
      }

      resolve(results.join('\n'));
    });
  });
};

const app = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (url === '/students') {
    const databasePath = process.argv[2];

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is the list of our students\n');

    countStudents(databasePath)
      .then((data) => {
        res.end(data);
      })
      .catch((err) => {
        res.end(err.message);
      });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

app.listen(1245);

module.exports = app;
