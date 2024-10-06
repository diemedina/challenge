import express from 'express'
import cors from 'cors'
import { getItems, getItem } from './service/items'

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 8080

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`)
})

app.get('/api/items', async(req, res) => {
  const query = req.query.q;

  if (!query) {
    res.status(400).send('Missing query parameter');
    return;
  }

  if (typeof query !== 'string') {
    res.status(400).send('Invalid query parameter');
    return;
  }

  try {
    const response = await getItems(query);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/items/:id', async(req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send('Missing id parameter');
    return;
  }

  try {
    const response = await getItem(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});