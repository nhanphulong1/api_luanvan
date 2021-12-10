const nodemailer = require('nodemailer');
const ScheduleModel = require('../models/schedule.model');
const ConfigModel = require('../models/configs.model');

let c_email = '';
let c_pass = '';
let c_name = '';
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
            // pass: 'ueoguxdthszoxpgg'
    }
});

async function getconfig() {
    let kq = await ConfigModel.getConfigs(async(err, config) => {
        c_email = await config.c_email;
        c_pass = await config.c_pass;
        c_name = await config.c_name;
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: c_email,
                pass: c_pass
                    // pass: 'ueoguxdthszoxpgg'
            }
        });
    })
}

let a = getconfig();





//create new mail
exports.createUser = async(req, res) => {
    await ScheduleModel.getScheduleByClassId(req.body.cla_id, (err, schedule) => {
        let data = '';
        let pay_type = '';
        (req.body.pay_type == 0) ? pay_type = 'Chưa thanh toán': pay_type = 'Đã thanh toán';
        if (schedule != null)
            schedule.forEach(element => {
                data += `<tr>
                <td>` + element.day_name + `</td>
                <td>` + element.shi_id + `</td>
                <td>` + element.sche_quantity + `</td>
                <td>` + element.loc_name + ' - ' + element.loc_address + `</td>
            </tr>`
            });
        let htmlData = `<p>Chào ` + req.body.name + `</p>
        <p>Bạn đã đăng ký thành công khóa học ` + req.body.cou_name + ` của trung tâm đào tạo lái xe NhanDV. Sau đây là các thông tin chi tiết:</p>
        <h4><b>Thông tin tài khoản:</b></h4>
        <div style="padding-left: 25px;">
            <p>Tài khoản: <b>` + req.body.code + `</b></p>
            <p>Mật khẩu: <b>123456</b></p>
            <p style="font-size: 14px; color: brown">*Vui lòng nhớ xác thực tài khoản và cập nhật thông tin chi tiết khi đăng nhập</p>
        </div>
        <h4><b>Thông tin lớp học</b></h4>
        <table style="width: 100%;">
            <tr>
                <td>Mã lớp học: ` + req.body.cla_code + `</td>
                <td>Tên giáo viên: ` + req.body.tea_name + `</td>
                <td>Khóa học: ` + req.body.cou_name + `</td>
            </tr>
            <tr>
                <td>Khóa học: ` + req.body.cla_course + `</td>
                <td>Ngày khai giảng: <span style="color: blue; font-weight: bold;">` + new Date(req.body.cla_start).toLocaleString() + `</span></td>
                <td>Trạng thái: <span style="color: red; font-weight: bold;">` + pay_type + `</span></td>
            </tr>
        </table>
        <h4>Thời khóa biểu</h4>
        <table style="width: 100%; text-align: center;" border="1px">
            <tr>
                <th>Thứ</th>
                <th>Tiết bắt đầu</th>
                <th>Số tiết</th>
                <th>Phòng học</th>
            </tr>
            ` + data + `
        </table>
        `;
        let mailOptions = {
            from: c_name,
            to: req.body.email,
            subject: 'Đăng ký thành công khóa học',
            html: htmlData
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ status: 1 });
            }
        });
    })
}

exports.createTeacher = (req, res) => {
    let htmlData = `<p>Chào ` + req.body.tea_name + `</p>
    <p>Bạn đã trở thành giáo viên của trung tâm đào tạo lái xe.</p>
    <h4><b>Thông tin tài khoản:</b></h4>
    <div style="padding-left: 25px;">
        <p>Tài khoản: <b>` + req.body.tea_code + `</b></p>
        <p>Mật khẩu: <b>123456</b></p>
        <p style="font-size: 14px; color: brown">*Vui lòng nhớ xác thực tài khoản và cập nhật thông tin chi tiết khi đăng nhập</p>
    </div>
    `;
    let mailOptions = {
        from: c_name,
        to: req.body.tea_email,
        subject: 'Thêm mới giáo viên',
        html: htmlData
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.status(500);
        } else {
            res.json({ status: 1 });
        }
    });
}

exports.createMailAssignment = (req, res) => {
    ScheduleModel.getScheduleByClassId(req.body.cla_id, (err, schedule) => {
        let data = '';
        if (schedule != null)
            schedule.forEach(element => {
                data += `<tr>
                <td>` + element.day_name + `</td>
                <td>` + element.shi_id + `</td>
                <td>` + element.sche_quantity + `</td>
                <td>` + element.loc_name + ' - ' + element.loc_address + `</td>
            </tr>`
            });
        let htmlData = `<p>Chào ` + req.body.teacher[0].tea_name + `</p>
            <p>Bạn đã phân công giảng dạy một lớp học mới. Sau đây là các thông tin chi tiết:</p>
            <h4><b>Thông tin lớp học</b></h4>
            <table style="width: 100%;">
                <tr>
                    <td>Mã lớp học: ` + req.body.cla_code + `</td>
                    <td>Tên lớp học: ` + req.body.cla_name + `</td>
                    <td>Khóa học: ` + req.body.cou_name + `</td>
                </tr>
                <tr>
                    <td>Khóa học: ` + req.body.cla_course + `</td>
                    <td>Ngày khai giảng: <span style="color: blue; font-weight: bold;">` + req.body.cla_start + `</span></td>
                    <td>Tổng số tiết học: ` + req.body.cla_count + `</td>
                </tr>
            </table>
            <h4>Thời khóa biểu</h4>
            <table style="width: 100%; text-align: center;" border="1px">
                <tr>
                    <th>Thứ</th>
                    <th>Tiết bắt đầu</th>
                    <th>Số tiết</th>
                    <th>Phòng học</th>
                </tr>
                ` + data + `
            </table>
            `;
        let mailOptions = {
            from: 'dvnhan1999@gmail.com',
            to: req.body.teacher[0].tea_email,
            subject: 'Phân công giảng dạy lớp học mới.',
            html: htmlData
        };
        console.log(transporter);
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ status: 1 });
            }
        });
    });
}

exports.createMailContact = (req, res) => {
    let mailOptions = {
        from: 'dvnhan1999@gmail.com',
        to: req.body.email,
        subject: 'Phản hồi gmail góp ý tới trung tâm!',
        text: req.body.content
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.status(500);
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ status: 1 });
        }
    });
}