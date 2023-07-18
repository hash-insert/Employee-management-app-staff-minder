const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

mongoose
  .connect('mongodb+srv://greesh_5:munny123@cluster0.lvfzzc5.mongodb.net/staffminder', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });