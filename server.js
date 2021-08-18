const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const sendEmail = require('./utils/sendEmail')


// Creating an express app
const app = express()

// Initializing dotenv || Load env vars
dotenv.config({ path: './config/config.env' })

// using JSON parser
app.use(express.urlencoded({
    extend: false
}));
app.use(express.json())


// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.get('/', (req, res) => {
    // res.json({
    //     message: "HNG"
    // })
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.post('/email', async (req, res) => {
    //Send an email here but currently dummy email
    const { email, fullname, address, personalProfile, experience, education, skills, certifications } = req.body;
    // console.log('Data:', subject);
   
    try {
        await sendEmail({
            from: `${process.env.FROM_EMAIL}`,
            email: `${email}`,
            subject: 'Resume',
            message: `Email: ${email} \n\nFull Name: ${fullname} \n\nAddress: ${address} \n\nPersonalProfile: ${personalProfile} \n\nExperience: ${experience} \n\nEducation: ${education} \n\nSkills: ${skills} \n\nCertifications: ${certifications}`
        })

        // res.json({
        //     successs: true,
        //     email, 
        //     fullname, 
        //     address, 
        //     personalProfile, 
        //     experience, 
        //     education, 
        //     skills, 
        //     certifications
        // })
        res.sendFile(path.join(__dirname, 'views', 'resume.html'))
    } catch (error) {
        console.error(`${error}`.red.inverse)
    }
});


// Use error Middleware
// app.use(notFound)
// app.use(errorHandler)


const PORT = process.env.PORT || 5000
// app listener
app.listen(PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))