const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const ejs = require('ejs')
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


// View Engine Setup
app.set("views", path.join(__dirname, 'views'))
app.set("view engine", "ejs")

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.static('views'));

app.get('/', (req, res) => {
    // res.json({
    //     message: "HNG"
    // })
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.post('/email', async (req, res) => {
    //Send an email here but currently dummy email
    const { email, name,message } = req.body;
    // console.log('Data:', subject);
   console.log('Pascal Chijioke Ojinnaka')
    try {
        await sendEmail({
            from: `${process.env.FROM_EMAIL}`,
            email: `${email}`,
            subject: 'Resume',
            message: `Dear Pascal, Kindly see below comment \n\nFullname : ${name}\n\nComment : ${message}`
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
        // res.sendFile(path.join(__dirname, 'views', 'resume.html'))

        res.render("displayFeedback",
            {
                email, 
                name, 
               message
            }
        );
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