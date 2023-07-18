const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/employees', adminRoutes);

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