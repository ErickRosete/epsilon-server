const express = require("express");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");

const multer = require("multer");
const bodyParser = require("body-parser");

const externalRequest = require("./middleware/external-requests");

const { saveImage, saveImages } = require("./helpers/images");
const isAuth = require("./middleware/is-auth");

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'))
app.use(externalRequest);
app.use(isAuth);

app.use(
    "/graphql",
    expressGraphQL({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true
    })
);

const upload = multer({
    dest: "app/uploads"
});

app.post('/uploadImage', upload.single("file"), (req, res) => {
    saveImage(req, res);
});

app.post('/uploadImages', upload.array("files"), (req, res) => {
    saveImages(req, res);
});

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
        }@cluster-0l6n5.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
        , { useNewUrlParser: true })
    .then(() => app.listen(8000))
    .catch(err => { console.log("error general"); console.log(err) });