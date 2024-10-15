const express = require('express');
const app = express();
const cors = require('cors');

const { createCertificate, getCertificate, enrollUserController,createUserController,editCertificate,getActiveCertificate } = require('./controller/certificationController');

app.use(express.json());
app.use(cors())

// 2024-10-15T00:00:00z for date input

app.post('/api/v1/admin/createCertificate', createCertificate)

app.get('/api/v1/admin/getCertificate', getCertificate)
app.post('/api/v1/user/createUser', createUserController)
app.post('/api/v1/user/enrollUser', enrollUserController)
app.put('/api/v1/admin/updateCertificate/:id', editCertificate)
app.get('/api/v1/user/activeCertificate', getActiveCertificate)


module.exports = app;