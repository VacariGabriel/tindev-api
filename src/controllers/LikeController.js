const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { devId } = req.params; //Pega o id de quem esta recebendo like
        const { user } = req.headers; //Pega o id no header de quem esta dando like
        
        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev) {
            return res.status(400).json('Dev not exists');
        }
    
        if(targetDev.likes.includes(loggedDev._id)) {
            console.log('DEU MATCH!');  
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
};