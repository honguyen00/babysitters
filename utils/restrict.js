const restrictedData = (req, res, next) => {
    if (!req.session || req.session.user_id != req.params.id) {
        res.json({message: 'Restricted data'});
    } else {
        next();
    }
}

module.exports = restrictedData;