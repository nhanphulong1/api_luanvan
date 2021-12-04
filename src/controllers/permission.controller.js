const PermissionModel = require('../models/permission.model');

//Get all Permission
exports.getAllPermission = (req, res) => {
    PermissionModel.getAllPermission((err, Permission) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'Permission Seleted Successfully!', data: Permission });
    })
}

//Get all Permission
exports.getPermissionByUser = (req, res) => {
    PermissionModel.getPermissionByUser(req.params.user, (err, Permission) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        res.json({ status: 1, message: 'Permission Seleted Successfully!', data: Permission });
    })
}

//create new Permission
exports.updatePermissionUser = (req, res) => {
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        req.body.permission.forEach(element => {
            PermissionModel.createPermission(req.params.user, element, (err, Permission) => {
                // if (err) {
                //     return res.json({ status: 0, message: err });
                // }
            });
        });
        PermissionModel.deletePermission(req.body.permission, req.params.user, (err, permission) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1 });
        })
    }
}