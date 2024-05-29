const Guest = require('../models/guestModel')
const nodemailer = require('nodemailer')
require ('dotenv').config

const getGuests = async (req, res) => {
    
}

const sendInvitation = async(req,res)=>{
    const {to} = req.body
    console.log(to)
    const transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.user,
            pass:process.env.pass,
        }
    })
    
  let message = {
    from: 'shreyaganguly2003@gmail.com',
    to: to,
    subject: "Sending Invitation",
    text: "Testing..........",
  };
  transport.sendMail(message, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });




}

const createGuest = async (req, res) => {
    
}

const updateGuest = async (req, res) => {
    
}       

const deleteGuest = async (req, res) => {      

}

module.exports = {
    getGuests,
    createGuest,
    updateGuest,
    deleteGuest,
    sendInvitation
}