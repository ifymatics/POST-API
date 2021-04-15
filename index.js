require('dotenv').config();
const express = require('express');
const postRoutes = require('./routes/postRoutes');
const pingRoutes = require('./routes/pingRoutes');
const app = express();
app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/ping', pingRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));