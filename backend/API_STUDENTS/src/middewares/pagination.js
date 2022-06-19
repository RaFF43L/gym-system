
function pagination(req, res, next){
    
    const {page, limit, orderBy, sort} = req.query;
    req.options = {
        limit: limit,
        page: page,
        orderBy: orderBy,
        sort: sort
    }

    next();
}

module.exports = pagination;