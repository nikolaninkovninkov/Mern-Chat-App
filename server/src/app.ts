import express from 'express';
import { config as dotenv_config } from 'dotenv';
import apiRouter from './routes/api/apiRouter';
import { connect } from 'mongoose';
dotenv_config();
const app = express();
const port = process.env.PORT || 8080;

//uses
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Heloo from root! Fix typo for me!');
});
app.use('/api', apiRouter);
connect(process.env.DB_URI + '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {});
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  connect(process.env.DB_URI + '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
    .catch((err) => console.log(err))
    .then(() => {
      console.log('MongoDB connected successfully! <3');
    });
});
