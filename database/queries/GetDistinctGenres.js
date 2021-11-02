const Artist = require('../models/artist');

/**
 * Searches through the Artist collection for dinstinc genres
 * @return {promise} A promise that resolves with the distinct genres
 */
module.exports = () => {

    
    //return  Artist.aggregate([{$group: { _id: "$genre"} } ])
    return  Artist.distinct("genre");

    
    
};
