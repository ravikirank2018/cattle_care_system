require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { connect } = require('./db');
const cowsRouter = require('./routes/cows');
const tradeRouter = require('./routes/trade');
const predictRouter = require('./routes/predict');
const advisoryRouter = require('./routes/advisory');
const grantsRouter = require('./routes/grants');
const healthRouter = require('./routes/health');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok', name: 'Smart Livestock Backend' }));

app.use('/api/cows', cowsRouter);
app.use('/api/trade', tradeRouter);
app.use('/api/predict', predictRouter);
app.use('/api/advisory', advisoryRouter);
app.use('/api/grants', grantsRouter);
app.use('/api/health/metrics', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

const port = process.env.PORT || 4000;

(async () => {
  try {
    await connect(process.env.MONGODB_URI);
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (err) {
    console.error('Failed to start server due to DB error');
    process.exit(1);
  }
})();
