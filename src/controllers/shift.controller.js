const ShiftModel = require('../models/Shift.model');

//get Shift by ID
exports.getAllShift = (req, res) => {
    ShiftModel.getAllShift((err, Shift) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Shift Seleted Successfully!', data: Shift });
    })
}