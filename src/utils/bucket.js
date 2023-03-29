import S3 from "aws-sdk/clients/s3";
import { Credentials } from "aws-sdk";
import config from './s3';






const access = new Credentials({
    accessKeyId: config.accessKey,
    secretAccessKey: config.secretKey,
  });
    
const s3 = new S3({
    credentials: access,
    region: config.region, //"us-west-2"
    signatureVersion: "v4",
});

module.exports = s3

