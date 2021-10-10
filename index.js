const express = require('express');

//create app express
const app = express()
var cors = require('cors');

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

//setup server port
const port = 3000


app.get('/', (req, res) => {
    res.send('Hello World!')
})

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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})