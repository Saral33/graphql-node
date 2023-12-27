import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ msg: 'hello world' });
});

app.listen(5000, () => {
  console.log('Listening in port 5000');
});
