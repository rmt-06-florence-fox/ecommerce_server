function errorHandler(err, req, res, next) {
    console.log(err);
    if (err.status) {
        res.status(err.status).json({ message: err.message });
    } else if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError" ) {
            let errors = [];
            let tempMessage = [];
            for (let i = 0; i < err.errors.length; i++) {
                if (err.name === "SequelizeUniqueConstraintError") {
                    if(err.parent.table === "Users") {
                        errors.push("The email has been registered.")
                    }
                } else if(err.errors[i].message === "Password must contain at least 6 characters.") {
                    tempMessage.push(err.errors[i].message);
                } else if (err.errors[i].message === "Email is invalid.") {
                    if (!errors.includes("Email is required.")) {
                        errors.push(err.errors[i].message);
                    }
                } else if (err.errors[i].message === "Role is invalid.") {
                    if (!errors.includes("Role is required.")) {
                        errors.push(err.errors[i].message);
                    }
                } else if (err.errors[i].message === "Price cannot be less than 0.") {
                    if (!errors.includes("Price is required.") && !errors.includes("Price must be numeric.") ) {
                        errors.push(err.errors[i].message);
                    }
                } else if (err.errors[i].message === "Price must be numeric.") {
                    if (!errors.includes("Price is required.") ) {
                        errors.push(err.errors[i].message);
                    }
                } else if (err.errors[i].message === "Stock cannot be less than 0.") {
                    if (!errors.includes("Stock is required.") && !errors.includes("Stock must be numeric.") ) {
                        errors.push(err.errors[i].message);
                    }
                } else if (err.errors[i].message === "Stock must be numeric.") {
                    if (!errors.includes("Stock is required.") ) {
                        errors.push(err.errors[i].message);
                    }
                } else if (err.errors[i].message === "Price is required.") {
                    tempMessage.push(err.errors[i].message);
                } else if (err.errors[i].message === "Stock is required.") {
                    tempMessage.push(err.errors[i].message);
                }
                else {
                    if(!errors.includes(err.errors[i].message)) {
                        errors.push(err.errors[i].message);
                    }
                }
            }
            if (tempMessage.length) {
                errors = errors.concat(tempMessage);
                tempMessage.length = 0;
            }
        res.status(400).json({ messages: errors });
    } else if (err.name === 'TokenExpiredError') {
        res.status(401).json({ message: "Your session is expired."});
    } else {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = errorHandler;