const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');

const app = express();

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.post('/api/users/register', (req, res) => {
    // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 DB에 넣어준다
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })

        return res.status(200).json({
            registerSuccess: true,
            message: "회원가입되었습니다."
        });
    });
});

app.post('/api/users/login', (req, res) => {
    // 요청된 이메일이 데이터베이스에 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) return res.json({
            loginSuccess: false,
            message: "존재하지 않는 이메일 주소입니다."
        });

        // 요청된 이메일이 데이터베이스에 있다면 비밀번호를 검사한다.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({
                loginSuccess: false,
                message: "잘못된 비밀번호입니다."
            });

            // 비밀번호가 맞다면 토큰을 생성한다.
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                // 토큰을 쿠키, 세션 혹은 로컬스토리지 등에 저장한다.
                // 여기에서는 쿠키에 저장한다.
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id });
            });
        });
    });
});

// role 0 -> user, role 1 -> admin (role이 0이 아니면 admin)
app.get('/api/users/auth', auth, (req, res) => {
    // 여기까지 middleware를 통과해 왔다는 얘기는 authentication이 true라는 말
    res.status(200).json({
        _id: req.user._id,
        isAdimin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id },
        { token: "" },
        (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            });
        });
});


const port = 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));