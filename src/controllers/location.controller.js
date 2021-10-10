const LocationModel = require('../models/Location.model');

//get Location by ID
exports.getAllLocation = (req, res) => {
    LocationModel.getAllLocation((err, Location) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Location Seleted Successfully!', data: Location });
    })
}