import express from 'express';
import pug from 'pug';

const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', {});
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});