import express from 'express';

const app = express();

app.get('/', (_, res) => res.send('from Node + Nx + Vercel!'));

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Server running on port ${port}`));
