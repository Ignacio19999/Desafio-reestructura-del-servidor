exports.index = (req, res) => {
    res.sendFile('index.handlebars', { root: 'views'});
};