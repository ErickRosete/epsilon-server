const path = require("path");
const fs = require('fs');
const AWS = require('aws-sdk');

let obj={id:"",secret:""};
let imageLinks;

// https://javascript.info/promise-basics
function awsUpload(s3,params){
    return new Promise((resolve, reject) => {
        s3.upload(params,(error,data)=>{
            // console.log(error)
            resolve(data);
            reject(error);
        })
    })
}

const subeAmazon= async (folder,file)=>{      
    //ejemplo imagen cargada  https://fiesta-magica.s3.amazonaws.com/imagenes/1554840478901_img1.jpg
    // https://s3.console.aws.amazon.com/s3/home?region=us-east-1
    // https://aws.amazon.com/blogs/aws/amazon-s3-block-public-access-another-layer-of-protection-for-your-accounts-and-buckets/
    // https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html
    // http://awspolicygen.s3.amazonaws.com/policygen.html
    // http://www.jppinto.com/2011/12/access-denied-to-file-amazon-s3-bucket/
    // https://docs.google.com/presentation/d/1v1zxifAMklRov_P8YOW6IBDDBPKDXj0m5axjJU_dgG8/edit#slide=id.g33d18745e3_0_145
    // https://medium.com/codebase/using-aws-s3-buckets-in-a-nodejs-app-74da2fc547a6
        //configuring the AWS environment
    AWS.config.update({
        accessKeyId: obj.id,
        secretAccessKey: obj.secret
    });

    var s3 = new AWS.S3();
    var filePath = file.path;
    const fileName=file.originalname
    // console.log(`file: ${file}`)
    console.log(`file path is ${filePath}`)
    console.log(`file name is ${fileName}`)
    const key=folder+"/"+Date.now()+"_"+fileName;
    console.log(`Destino: ${key}`)

    //configuring parameters
    var params = {
        Bucket: process.env.bucket,
        Body : await fs.createReadStream(filePath),
        Key : key//nombre delarchivo en S3
    };
    await awsUpload(s3,params).then((data,err)=>{
        if (err) {
            console.log("Error", err);
            // res.status(500).json(error);
        }    
         if (data) {
                console.log("Uploaded in:", data.Location);
                imageLinks.push(data.Location);
        }
    })
        // , async (err, data)=> {
        // //handle error
        // if (err) {
        //     console.log("Error", err);
        //     // res.status(500).json(error);
        // }
        // //success
        // if (data) {
        //     await console.log("Uploaded in:", data.Location);
        //     imageLinks.push(data.Location);
        // }
    // });

    //configuring parameters
    /*
    var params = {
        Bucket: 'fiesta-magica',
        Body : fs.createReadStream(filePath),
        Key : "imagenes/"+Date.now()+"_"+path.basename(filePath)//nombre delarchivo en S3
    };

    s3.upload(params, function (err, data) {
        //handle error
        if (err) {
            console.log("Error", err);
        }
        
        //success
        if (data) {
            console.log("Uploaded in:", data.Location);
        }
        });
    */

}

const setCredentials=async (folder,file)=>{
      //security credentials from json, better from env variables
    // await fs.readFile('./key.json', 'utf8', async  (err, data) =>{
    //     if (err) throw err; // we'll not consider error handling for now
    //     obj = await JSON.parse(data);
    //     console.log(obj)
    //     console.log(obj.id)
    // });

    //   console.log(`file: ${file}`)
    obj.id=process.env.id;
    obj.secret=process.env.secret;

    console.log("dentro de leeJson");
    console.log(obj)
    console.log(folder)
    // console.log(obj.id)
    return [folder,file]
}

exports.saveImageAsyncMultiple = async (req, res, folder) => {
    imageLinks = [];
    console.log("##########################saving in aws")
    console.log(req.files);
    console.log(req.files.length)
    req.files.forEach(file => {
        const fileExt = path.extname(file.originalname).toLowerCase();
        console.log(`Extension: ${fileExt}`)
        // console.log(file)
        // console.log(`file: ${file}`)
        if (fileExt === ".png" || fileExt === ".jpg" || fileExt === ".jpeg" || fileExt === ".bmp" || fileExt === ".gif") {
            console.log("formato adecuado");
            setCredentials(folder,file).then(async(data)=>{
                console.log("=======termine de leer el json")
                let folder=data[0];let file=data[1]
                await subeAmazon(folder,file);
                console.log("subi a amazon")
                console.log(imageLinks)
                if(imageLinks.length==req.files.length){
                    console.log("captura de imagenes terminada")
                    console.log(imageLinks)
                    res.status(200).json(imageLinks);
                }
            });
        }
        else{
            console.log("formato inadecuado")
        }
    })
}

exports.saveImageAsyncSingle = async (req, res, folder) => {
    imageLinks = [];
    console.log("saving in aws")
    let file=req.file;
    console.log(file);
    const fileExt = path.extname(file.originalname).toLowerCase();
    console.log(`Extension: ${fileExt}`)
    // console.log(file)
    // console.log(`file: ${file}`)
    if (fileExt === ".png" || fileExt === ".jpg" || fileExt === ".jpeg" || fileExt === ".bmp" || fileExt === ".gif") {
        console.log("formato adecuado");
        setCredentials(folder,file).then(async(data)=>{
            console.log("=======termine de leer el json")
            let folder=data[0];let file=data[1]
            await subeAmazon(folder,file);
            res.status(200).json(imageLinks[0]);
            // if(imageLinks.length==req.files.length){
            //     console.log("captura de imagenes terminada")
            //     console.log(imageLinks)
            //     res.status(200).json(imageLinks);
            // }
        });
    }
    else{
        console.log("formato inadecuado")
    }
}
