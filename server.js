const express = require("express");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");

const multer = require("multer");
const bodyParser = require("body-parser");

const externalRequest = require("./middleware/external-requests");

const { saveImage, saveImages } = require("./helpers/images");
const { sendEmail } = require("./helpers/Email/sendEmail");
const {htmlContent} =require("./helpers/Email/template")
const {htmlContent2} =require("./helpers/Email/clienteEpsilon")

const { saveImageAsyncSingle,saveImageAsyncMultiple}=require("./helpers/Images/aws")
const isAuth = require("./middleware/is-auth");

const port = process.env.PORT || 5000;

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
    dest: "/app/uploads"
});

app.post('/uploadImage', upload.single("file"),  (req, res) => {
    const folder=req.body.folder
    console.log(`folder donde se guardara: ${folder}`)
    saveImageAsyncSingle(req,res,folder)
    
    //guardar local
    // saveImage(req, res);
});

app.post('/sendEmail', (req, res) => {
    console.log("sendEmail")
    const vendedorEmail="ventas@epsiloncomputadoras.mx"
    // const clienteEmail="oscaralonso11@hotmail.com"//TODO: CAMBIAR A req.body.email cuando este validado el formulario
    const clienteEmail=req.body.email
    // logo y correo png
    // const smtpClient={   
    //     host: "smtp.zoho.com",
    //     port: 465,
    //     auth: {
    //         // user:"admin@oscarrosete.com",
    //         user:"oscar.rosete@oscarrosete.com",
    //         pass:"LiaAshanti1!"
    //     }
    // }
    const smtpClient={   
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            // user:"admin@oscarrosete.com",
            user:"noreply@astradev.co",
            pass:"desarrollo2019"
        }
    }
    //=============correo al vendedor
    console.log(req.body)
    const emailContent={
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        topic:"duda existencial",
        body:"i am in love",
        equipment:req.body.equipment,
        quantity:req.body.quantity,
        project:req.body.project

    }
    console.log(emailContent)
    const content=htmlContent(emailContent)

    let emailInfo={
        to:vendedorEmail,
        subject:"Seguimiento Contacto Epsilon",
        htmlContent:content,
        smtpClient
    }
    const isSend = sendEmail(emailInfo);


    //======correo al cliente
    const content2=htmlContent2(emailContent)
    // console.log(content2)
    let emailInfo2={
        to:clienteEmail,
        subject:"Seguimiento Contacto Epsilon",
        htmlContent:content2,
         // attaching http://localhost:5000/images/LogoColor.png
         attachments: [{
            filename: 'fondo.png',
            path:"./public/images/fondo.png",
            cid: 'logo', //same cid value as in the html img src
        // },{
        //     filename: 'correo.png',
        //     path:"./public/images/correo.png",
        //     cid: 'correo', //same cid value as in the html img src
        // }
         }],   
        smtpClient
    }
    const isSend2 = sendEmail(emailInfo2);


    if(!isSend || !isSend2){
        res.status(400).send({ error: "server error" });
    }else{res.status(200).json(req.body) }
    // isSend ? res.status(200).json(req.body) : res.status(400).send({ error: "server error" });
});

app.post('/uploadImages', upload.array("files"), async (req, res) => {
    const folder=req.body.folder
    console.log(`folder donde se guardara: ${folder}`)
    await saveImageAsyncMultiple(req,res,folder);

    // guardar local
    // saveImages(req, res);
});

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
        }@cluster-0l6n5.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
        , { useNewUrlParser: true })
    .then(() => {
        app.listen(port);
        console.log("App running on port " + port)
    })
    .catch(err => { console.log("error general"); console.log(err) });