import * as express from 'express';
import * as bodyParser from "body-parser";

let router = express.Router();

router.use(bodyParser.json())

router.get('/helloworld', (req, res) => {
    res.json({message: "Hello World!"})
})

router.post('/echo', (req, res) => {
    res.json(req.body)
})

module.exports = router