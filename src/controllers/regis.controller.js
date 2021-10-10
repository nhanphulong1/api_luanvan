const RegistersModel = require('../models/Regis.model');


// get all Registers list
exports.getRegistersList = (req, res) => {
    // console.log('Registers list here!');
    RegistersModel.getAllRegisters((err, Registers) => {
        console.log('Registers list here!');
        //if failue !!
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Registers Selected All Successfully!', data: Registers });
    })
};

exports.getRegisterSearch = (req, res) => {
    var name, status, type;
    (req.body.status == "2") ? status = '%%': status = '%' + req.body.status + '%';
    (req.body.name == "") ? name = '%%': name = '%' + req.body.name + '%';
    (req.body.type == "all") ? type = '%%': type = '%' + req.body.type + '%';
    RegistersModel.getRegisterSearch(name, type, status, (err, Registers) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Registers Search Selected Successfully!', data: Registers });
    })
}

//create new Registers
exports.createRegisters = (req, res) => {
    console.log('create new Registers', req.body);
    const RegistersReqData = new RegistersModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        console.log('valid data');
        RegistersModel.createRegisters(RegistersReqData, (err, Registers) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'Registers Created Successfully!', data: Registers });
        });
    }
}

//update resgist
exports.updateRegisters = (req, res) => {
    // console.log('Registers list here!');
    RegistersModel.updateRegistersById(req.params.id, (err, Registers) => {
        console.log('Registers list here!');
        //if failue !!
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Registers Updated Successfully!' });
    })
};

//Delete Registers by id
exports.deleteRegisters = (req, res) => {
    console.log('delete Registers here');
    RegistersModel.deleteRegistersById(req.params.id, (err, Registers) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'Registers Deleted Successfully!' });
    });
}