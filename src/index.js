const app = require('./app');
const port = process.env.PORT || 3090;

app.listen(port);
console.log('Server listening on:', port);