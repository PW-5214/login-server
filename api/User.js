const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./../models/User');


router.post('/signup', (req, res) => {
    let { name, email, password, dateofbirth } = req.body;

    
    if (!name || !email || !password || !dateofbirth) {
        return res.json({ status: "error", message: "All fields are required" });
    }
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateofbirth = dateofbirth.trim();

  
    if (!/^[a-zA-Z]+$/.test(name)) {
        return res.json({ status: "error", message: "Invalid name" });
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return res.json({ status: "error", message: "Invalid email" });
    }
    if (!new Date(dateofbirth).getTime()) {
        return res.json({ status: "error", message: "Invalid date of birth" });
    }
    if (password.length < 8) {
        return res.json({ status: "error", message: "Password must be at least 8 characters long" });
    }

    // Check if user already exists
    User.findOne({ email }).then(existingUser => {
        if (existingUser) {
            return res.json({ status: "error", message: "User already exists" });
        }

        
        bcrypt.hash(password, 10).then(hashedPassword => {
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                dateofbirth
            });

            newUser.save()
                .then(savedUser => {
                    res.json({
                        status: "success",
                        message: "User created successfully",
                        data: savedUser
                    });
                })
                .catch(err => {
                    console.error(err);
                    res.json({ status: "error", message: "Error saving user" });
                });
        }).catch(err => {
            console.error(err);
            res.json({ status: "error", message: "Error hashing password" });
        });
    }).catch(err => {
        console.error(err);
        res.json({ status: "error", message: "Error checking user" });
    });
});


router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ status: "error", message: "Email and password are required" });
    }

    User.findOne({ email }).then(user => {
        if (!user) {
            return res.json({ status: "error", message: "Invalid credentials" });
        }

        bcrypt.compare(password, user.password).then(match => {
            if (!match) {
                return res.json({ status: "error", message: "Invalid credentials" });
            }

            res.json({
                status: "success",
                message: "Login successful",
                data: { name: user.name, email: user.email }
            });
        }).catch(err => {
            console.error(err);
            res.json({ status: "error", message: "Error checking password" });
        });
    }).catch(err => {
        console.error(err);
        res.json({ status: "error", message: "Error finding user" });
    });
});

module.exports = router;
