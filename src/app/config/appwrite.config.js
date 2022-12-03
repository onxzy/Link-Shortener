const { Client, Databases } = require('node-appwrite');

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT)                
  .setKey(process.env.APPWRITE_APIKEY);  

module.exports = {
  databases: new Databases(client),
};
