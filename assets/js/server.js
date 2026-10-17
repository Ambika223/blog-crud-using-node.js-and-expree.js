const cl = console.log;
const app = require('./app');

const port = 3000;

app.listen(3000, () => {
    cl(`server running on port ${port}`);
})
