const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

//middleware start
const cors = require("cors");
const sequelize = require("./config/sequelize");
const { User } = require("./models/user");
const refreshToken = require("./middlewares/refreshToken");
app.use(express.json());
app.use(cors());

app.use(refreshToken);
app.post('/login', async (req, res) => {
    try {

        const user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            const isSuccess = await bcrypt.compare(req.body.password, user.password);

            if (isSuccess) {
                const token = user.createAuthToken();
                res
                    .status(200)
                    .header("x-auth-token", token)
                    .json({
                        message: "Login is successfully",
                        data: {
                            fullname: user.fullname,
                            email: user.email,
                            phone: user.phone,
                            token: token
                        },
                    });
            } else {
                res
                    .status(403)
                    .json(errorMessage("Email or password is worng!", error));
            }
        } else {
            res.status(404).json(errorMessage("This user is not existed", error));
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

app.post('/register', async (req, res) => {
    try {
        // Şifrənin hash olunması
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        // Yeni user obyektini hazırlayırıq
        const dataBody = {
            ...req.body,
            password: hashPassword,
            role: "user",
        };

        // DB-yə user əlavə edirik
        const user = await User.create(dataBody);

        // Refresh token generate edirik
        const refreshToken = user.createRefreshToken();

        // DB-də user-in refresh tokenini saxlayırıq
        await user.update({ refreshToken });

        res.status(201).json({
            message: "Created",
            data: user,
            refreshToken
        });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});







//App Start
app.use("/", (req, res) => {
    res.status(200).send("App Start");
});

// const migrationCall = () => {
//   async function sync() {
//     await User.sync({ force: true });
//     console.log("User was created");
//   }

//   sync();
// };

// migrationCall();

//Sequelize Start
// async function migration() {
//     await sequelize.sync({ force: true });
// }
// migration()

//Server Start
app.listen(3000, () => {
    console.log(`Express server is running on port 3000`);
});
