const express = require('express');
const app = express();

const indexRoutes = require('./routes/index');
const calculatorRoutes = require('./routes/calculator');

app.set('view engine', 'ejs');

app.use('/', indexRoutes);
app.use('/calculator', calculatorRoutes);


app.listen(process.env.PORT || 3000, () => {console.log('Server listening on port 3000')});