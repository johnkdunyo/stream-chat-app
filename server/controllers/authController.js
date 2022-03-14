const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { connect } = require('getstream');
const StreamChat = require('stream-chat').StreamChat;

const api_key = process.env.STREAM_API_KEY
const api_secret = process.env.STREAM_API_SECRET
const app_id = process.env.STREAM_APP_ID




exports.logInController =  async (req, res, next) => {

    try {
        const { userName, password} = req.body;

        const serverClient = connect(api_key, api_secret, app_id);

        const client = StreamChat.getInstance(api_key, api_secret);

        const {users} = await client.queryUsers({name: userName});

        if(!users.length) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        const success =  await bcrypt.compare(password, users[0].hashPassword);

        const token = serverClient.createUserToken(users[0].id)

        if(success) {
            res.status(200).json({
                token,
                fullName: users[0].fullName,
                userName: users[0].userName,
                userID: users[0].id
            })
        } else {
            res.status(400).json({
                message: "Incorrect Passeword, check and try again"
            })
        }
        
    } catch (error) {
        next(error)
        
    }
}


exports.signUpController = async(req, res, next) => {

    try {
        const {fullName, userName, password, phoneNumber} = req.body;

        const userID = crypto.randomBytes(16).toString('hex');
        const serverClient = connect(api_key, api_secret, app_id);

        const hashPassword = await bcrypt.hash(password, 10)

        const token = serverClient.createUserToken(userID)

        res.status(200).json({
            token, 
            userID,
            userName,
            hashPassword,
            phoneNumber
        })

        
    } catch (error) {
        next(error)
        
    }
} 