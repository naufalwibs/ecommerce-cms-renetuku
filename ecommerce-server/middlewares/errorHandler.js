
function errorHandler(err, req, res, next) {
    if (err.name == "SequelizeValidationError" || err.name == 'SequelizeUniqueConstraintError') {
        let errors = [];
        err.errors.forEach(el => {
            errors.push(el.message);
        });
        res.status(400).json({
            message: err.message,
            detail: errors
        })

    } else if (err.code === 401) {
        res.status(err.code).json({message: err.message, from: err.from})
    } else if (err.code === 404) {
        res.status(err.code).json({message: err.message, from: err.from})
    } else if (err.code === 500) {
        res.status(err.code).json({message: err.message, from: err.from})
    }

}

module.exports = errorHandler