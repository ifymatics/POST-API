const axios = require('axios');
const api = axios.create({
    baseUrl:'https://api.hatchways.io/assessment/blog/'
})
module.exports = api;