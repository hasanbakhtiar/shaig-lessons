const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./config/sequelize');
const { User } = require('./models/user');
const { Message } = require('./models/message');

app.use(express.json());
app.use(cors());
// middleware end


const userRouter = require('./routers/user');
app.use('/user', userRouter);

const messageRouter = require('./routers/message');
app.use('/message', messageRouter);








// Relations
const relationCall = () => {
    Message.belongsTo(User, {
        foreignKey: {
            allowNull: true,
        },
    });
    User.hasMany(Message);
};

// relationCall();

// // Sync
// (async () => {
//     await sequelize.sync({ force: true });
// })();



app.listen(3000, () => {
    console.log("Server is running on port 3000");
})