import axios from "axios";
import app from "express";


app.get('/api/data', async (req, res) => {
    try {
      const response = await axios.post('https://eu-west-2.aws.data.mongodb-api.com/app/data-qclwk/endpoint/data/v1/action/findOne', {
        collection: "users",
        database: "test",
        dataSource: "app-hathyre",
        projection: {
          "_id": 1
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': '<API_KEY>'
        }
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
