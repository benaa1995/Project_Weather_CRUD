const express = require('express');
const app = express();
const cors = require('cors');
const data = require('./db.json');

app.use(cors());
app.use(express.json());
app.get('/api/cities', (req, res) => {
  const cityNames = Object.keys(data);
  res.json(cityNames);
});

app.get('/api/cities/:cityName', (req, res) => {
  const cityName = req.params.cityName;
  const cityData = data[cityName];
  if (cityData) {
    res.json(cityData);
  } else {
    res.status(404).json({ error: `Error loading, server side.` });
  }
});

app.put('/api/cities/:cityName/:timestamp', (req, res) => {
  const cityName = req.params.cityName;
  const timestamp = req.params.timestamp;
  const newData = req.body;
  if (!data[cityName]) {
    return res.status(404).json({ error: `Error loading, server side.` });
  }

  if (!data[cityName][timestamp]) {
    return res.status(404).json({ error: `Error loading, server side.` });
  }

  data[cityName][timestamp] = newData;
  res.json({ message: 'Data updated successfully.' });
});

app.delete('/api/cities/:cityName/:timestamp', (req, res) => {
  const cityName = req.params.cityName;
  const timestamp = req.params.timestamp;

  if (!data[cityName]) {
    return res.status(404).json({ error: `Error loading, server side.` });
  }

  if (!data[cityName][timestamp]) {
    return res.status(404).json({ error: `Error loading, server side.` });
  }

  delete data[cityName][timestamp];
  res.json({ message: 'Data deleted successfully.' });
});

app.post('/api/cities/:cityName', (req, res) => {
  const cityName = req.params.cityName;
  const newData = req.body;

  if (!data[cityName]) {
    return res.status(404).json({ error: `Error loading, server side.` });
  }

  const timestamp = Object.keys(newData)[0]; 
  data[cityName][timestamp] = newData[timestamp];
  res.json({ message: 'Data added successfully.' });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});
