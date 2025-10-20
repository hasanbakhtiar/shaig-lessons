const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");


exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) return res.status(403).send("Email or password is wrong!");

        const isSuccess = await bcrypt.compare(req.body.password, user.password);
        if (!isSuccess) return res.status(403).send("Email or password is wrong!");


        const accessToken = jwt.sign({ id: user.id, role: user.role }, "access_secret", { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: user.id, role: user.role }, "refresh_secret", { expiresIn: "7d" });

        await User.update({ refreshToken }, { where: { id: user.id } });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Login successful",
            data: {
                fullname: user.fullname,
                email: user.email,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.register = async (req, res) => {
    try {

        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const dataBody = {
            ...req.body,
            password: hashPassword,
            role: "user",
        };
        const user = await User.create(dataBody);
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

}