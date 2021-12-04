const express = require('express');

//create app express
const app = express()
var cors = require('cors');

//stripe
const stripe = require('stripe')('sk_test_51JmKF4Ga5ke3UzMYDECQg0fO1LafnZEk7OwiE0IU821BKjxvgSz0upxyXw8r89mXd39xsJWTznxcf7refqAamVjM00DrHjvqAk');

const bodyParser = require('body-parser');

//impoort user routes
const userRoutes = require('./src/routes/user.route');
const studentRoutes = require('./src/routes/student.route');
const teacherRoutes = require('./src/routes/teacher.route');
const courseRoutes = require('./src/routes/course.route');
const classRoutes = require('./src/routes/class.route');
const detailRoutes = require('./src/routes/detail.route');
const regisRoutes = require('./src/routes/regis.route');
const ScheduleRoutes = require('./src/routes/schedule.route');
const contactRoutes = require('./src/routes/contact.route');
const shiftRoutes = require('./src/routes/shift.route');
const locationRoutes = require('./src/routes/location.route');
const dayRoutes = require('./src/routes/day.route');
const resultRoutes = require('./src/routes/result.route');
const paymentRoutes = require('./src/routes/payment.route');
const mailRoutes = require('./src/routes/mail.route');
const permissionRoutes = require('./src/routes/permission.route');
const notificationRoutes = require('./src/routes/notification.route');
const diariesRoutes = require('./src/routes/diaries.route');
const attendanceRoutes = require('./src/routes/attendance.route');
const examRoutes = require('./src/routes/exam.route');
const examStudentRoutes = require('./src/routes/exam_student.route');
const newsRoutes = require('./src/routes/news.route');
const configRoutes = require('./src/routes/configs.route');

//setup server port
const port = 3000


// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse request data content type application/json
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:4200' }));

//create user routes
app.use('/api/user', userRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/class', classRoutes);
app.use('/api/detail', detailRoutes);
app.use('/api/regis', regisRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/schedule', ScheduleRoutes);
app.use('/api/shift', shiftRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/day', dayRoutes);
app.use('/api/result', resultRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/mail', mailRoutes);
app.use('/api/permission', permissionRoutes);
app.use('/api/notifi', notificationRoutes);
app.use('/api/diaries', diariesRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/exam_student', examStudentRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/configs', configRoutes);

app.post('/payment', function(req, res) {
    stripe.charges.create({
        amount: req.body.price,
        source: req.body.TokenId,
        currency: 'vnd'
    }).then((result) => {
        res.json({ status: 1, paymentId: result.id });
    }).catch((err) => {
        res.status(500);
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})