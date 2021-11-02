const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {

    //ES5 sintax
    //const sortOder = {};
    //sortOrder[sortProperty] = 1;

    const query = {};
    if (criteria.age)
    {
        query.age = {
            $gte: criteria.age.min,
            $lte: criteria.age.max
        }
    }

    if (criteria.genre)
    {
        query.genre = { $eq: criteria.genre}
    }

    if (criteria.yearsActive)
    {
        query.yearsActive = {
            $gte: criteria.yearsActive.min,
            $lte: criteria.yearsActive.max
        }
    }

    if (criteria.name)
    {
        query.$text = {
            $search: criteria.name
        };
    }

    
    if (criteria.album)
    {
        query["albums.title"] = RegExp(`.*${criteria.album}.*`,'i');
    }


    const Query =  Artist.find(query).sort({[sortProperty]: 1}).skip(offset).limit(limit);
    const QueryCount =  Artist.find(query).count();
    return Promise.all([Query,QueryCount]).then((result) => { 
        return {all: result[0], count: result[1], offset: offset, limit: limit };
    } );
    
    
};
