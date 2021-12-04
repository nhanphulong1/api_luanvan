const ConfigsModel = require('../models/configs.model');

//get All Configs
exports.getAllConfigs = (req, res) => {
    ConfigsModel.getConfigs((err, Configs) => {
        return res.json({ data: Configs });
    });
}

//update new Configs
exports.updateConfigs = (req, res) => {
    const ConfigsReqData = new ConfigsModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        ConfigsModel.updateConfigsById(ConfigsReqData, (err, Configs) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Configs Updated Successfully!', data: Configs });
        });
    }
}