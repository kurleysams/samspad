'use strict';

module.exports = {
    mongoDataSource: {
        name: 'mongoDB',
        connector: 'mongodb',
        url: process.env.MONGOLAB_URI
    }
};