const AWS = require('aws-sdk');
const dotenv=require("dotenv");
const awsConfig = {
  accessKeyId: "DO00UXEMBFNJFR78CGVQ",
  secretAccessKey: "TZuMCESNdx6iRrI8cWOyQNYRDV8j795VHeb9O6kjsxc",
};
awsConfig.endpoint = new AWS.Endpoint('https://nyc3.digitaloceanspaces.com');

const S3Bucket = new AWS.S3(awsConfig);

//for single file upload 
exports.uploadsingleToS3 = (fileData, fileType) => {
  const spaceName = 'flooring-deals-bucket'; 
  return new Promise((resolve, reject) => {
    const uniqueKey = `${Date.now().toString()}.${fileType}`;
    const params = {
      Bucket: spaceName,
      Key: uniqueKey,
      Body: fileData,
      ACL:"public-read"
    };
    
    S3Bucket.upload(params, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

//Multiple File Upload
exports.uploadToS3 = (fileData, fileType) => {
  const spaceName = 'flooring-deals-bucket'; // Replace with your Space name
  const uploadPromises = [];
    for (const file of fileData) {
    const fileName = `flooring-deals-${Date.now().toString()}.${fileType}`; // You can adjust the file naming logic
    const fileContent = file.fileData; // Assuming fileData contains the file content
    const params = {
      Bucket: spaceName,
      Key: fileName,
      Body: fileContent,
      ACL:"public-read"
    };
  const uploadPromise = new Promise((resolve, reject) => {
    S3Bucket.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  uploadPromises.push(uploadPromise);
    }
  return Promise.all(uploadPromises);
};



