import express from 'express'; // use "require" if no "type": "module" in package.json

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Yo, this server is alive!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
