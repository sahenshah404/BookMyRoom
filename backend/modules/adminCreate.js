var bcrypt = require('bcryptjs');


bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("admin", salt, function(err, hash) {
        // Store hash in your password DB.
        console.log(hash);
        bcrypt.compare("admin", "$2a$10$rm7GtnQz9CzKORNyLKXIVu2/MEECfOiRzVbwOSwiv2ZcG0fxb5Lzm", function(err, res) {
            console.log(res);
        });
    });
});