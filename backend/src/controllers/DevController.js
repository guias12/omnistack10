const axios = require('axios');
const Dev = require('../models/Dev');

const parseStringAsArray = require('./util/parseStringAsArray');
module.exports = {

    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },

    async store (req, res) {
        const { github_username, techs, latitude, longitude } = req.body;
        
        const developer = await Dev.findOne({ github_username });

        if (!developer) {
            const url = `https://api.github.com/users/${github_username}`;    
            const apiResponse = await axios.get(url);
        
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
        
            const dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
        
        return res.json(dev);
    }
}