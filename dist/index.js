const express = require('express');

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded());
app.get('/:url', (req, res) => {
    console.log(req.params.url);
    res.send('Hello World!');
});
app.post('/', (req, res) => {
    let data = req.body;
    console.log(data + "qweqwe");
    res.send('Data Received: ' + JSON.stringify(data));
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map