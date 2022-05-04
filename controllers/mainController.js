const {v4: uuid} = require("uuid")
const userSchema = require("../model/userSchema")
const threadSchema = require("../model/threadSchema")


module.exports = {
    loggedIn: async (req, res) => {
        const userSecret = req.body.userSecret;
        const users = await userSchema.find();
        const user = users.find(x => userSecret === x.secret);
        const threads = await threadSchema.find();
        if (user) {
            res.send({success: true, user, threads})
        } else {
            res.send({success: false, threads})
        }
    },
    register: (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = new userSchema();
        user.username = username;
        user.password = password;
        user.picture = 'https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg'
        user.secret = uuid();
        user.save().then(() => {
        })
        res.send({success: true});
    },
    login: async (req, res) => {
        const username = req.body.username;
        const {stayLoggedIn} = req.body;
        const users = await userSchema.find();
        const user = users.find(x => username === x.username);

        if (user) {
            stayLoggedIn ? req.session.username = username : req.session.username = null
            const threads = await threadSchema.find()
            return res.send({success: true, user, threads})
        } else {
        }
    },
    newThread: async (req, res) => {
        const name = req.body.name;
        const user = req.body.user;
        const comments = req.body.comments;
        const thread = new threadSchema();
        thread.name = name;
        thread.user = user;
        thread.comments = comments;
        thread.save().then(() => {
        })
        const threads = await threadSchema.find()
        console.log(threads)
        res.send({success: true, threads})
    },
    newComment: async (req, res) => {
        const id = req.body.id;
        const comment = req.body.comment;
        const user = req.body.user;
        const currentThread = await threadSchema.findOne({_id: id})
        const newComment = {
            comment,
            user
        }
        await threadSchema.updateOne(
            {_id: id},
            {comments: [...currentThread.comments, newComment]}
        )
        const threads = await threadSchema.find()
        res.send({success: true, threads})
    }
}