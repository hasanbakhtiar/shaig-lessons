const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
//middleware start
const cors = require("cors");
const { User } = require("./models/user");
const { Product } = require("./models/product");
const auth = require("./middlewares/auth");
app.use(express.json());
app.use(cors());


app.post('/login', async (req, res) => {

    const ACCESS_SECRET = "supersecretaccess12345";
    const REFRESH_SECRET = "supersecretrefresh12345";
    try {

        const user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            const isSuccess = await bcrypt.compare(req.body.password, user.password);

            if (isSuccess) {
                const accessToken = jwt.sign({ id: user.id }, ACCESS_SECRET, { expiresIn: "15m" });
                const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: "7d" });

                // HttpOnly cookies
                res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 15 * 60 * 1000 });
                res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 7 * 24 * 60 * 60 * 1000 });
                res.status(200)
                    .header("x-auth-token", accessToken)
                    .json({
                        message: "Login is successfully",
                        data: {
                            fullname: user.fullname,
                            email: user.email,
                            phone: user.phone,
                            token: accessToken
                        },
                    });
                    console.log(accessToken,"======",refreshToken);
                    
            } else {
                res
                    .status(403)
                    .json({ errorMessage: "Email or password is worng!" });
            }
        } else {
            res.status(404).json({ errorMessage: "This user is not existed" });
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

        

        res.status(201).json({
            message: "Created",
            data: user,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

app.use(auth);

app.get('/product', async (req, res) => {
    const product = await Product.findAll();
    res.send(product)
})






//App Start
app.use("/", (req, res) => {
    res.status(200).send("App Start");
});


//Server Start
app.listen(3000, () => {
    console.log(`Express server is running on port 3000`);
});