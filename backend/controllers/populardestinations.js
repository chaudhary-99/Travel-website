const popularDestination = require("../models/popularDestination");

const populardestinations = async (req,res) =>{
    try {
        const destinations = await popularDestination.find(); // Fetch destinations from MongoDB
        res.json(destinations);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching popular destinations' });
      }
}

module.exports = populardestinations;