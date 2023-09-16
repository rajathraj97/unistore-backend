const accountSid = process.env.ACCOUNT_ID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const message = {}
const pick = require("../../node_modules/lodash/pick")

message.create = async(req,res) =>{
    try{
        console.log(req.body)
        const body = pick(req.body,['number','message'])
        if(body){
            client.messages
        .create({
            body: body.message,
            from: process.env.TWILIO_NUMBER,
            to: `${'+'} ${body.number}`
        })
        .then(message => console.log(message.sid))
        res.json({success:"success"})
        }else{
            res.status(201).json({error:'no body'})
        }
    }
    catch(e){
        res.json(e)
    }
}
module.exports = message