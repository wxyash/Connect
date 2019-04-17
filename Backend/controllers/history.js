const {ConnectionHistory}= require('../models/history')
const { Message } = require('../models/message')
const { User } = require('../models/user');
const _ = require('lodash')
const { badRequest, success } = require('../utils/responseHandler')

let eventfindAll = async function(req, res){
    let history;
    try {
        history = await ConnectionHistory.find({})
        if(!history){
            badRequest('history not found', {}, res)
        }
    } catch (error) {
        badRequest('Error finding history', {error: error.message}, res)
    }
    let historyArray = history.map((elems) =>{
        let data = {}
        data.id = elems._id
        data.userId = elems.user_id
        data.connectionType = elems.connection_type
        data.timeCreated = elems.time_created
        data.socketId = elems.socket_id
        return data
    })

    let eventArray = []
    for(const hist of historyArray){
        let user;
        try {
            user = await User.find({_id: {$in: hist.userId }})
        } catch (error) {
            badRequest('user not found', {error: error}, res)
        }
        for(const userinfo of user){
            let data = {
                connectionType: hist.connectionType,
                socketId: hist.socketId,
                timeCreated: hist.timeCreated,
                eventId: hist.id,
                firstName: userinfo.first_name,
                lastName: userinfo.last_name,
                email: userinfo.email
            }
            eventArray.push(data)
        }
    }

    success('User Chat History Found', {eventHistory: eventArray}, res)    
}

let chatHistory = async function (req, res) {
    let history;
    try {
        history = await Message.find({})
        if(!history){
            badRequest('history not found', {}, res)
        }
    } catch (error) {
        badRequest('Error finding history', {error: error.message}, res)
    }
    success('User Chat History Found', {chatHistory: history}, res)    
}

module.exports = {
    eventfindAll,
    chatHistory
}
