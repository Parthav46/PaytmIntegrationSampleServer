exports.test = (req, res) => {
    //Test https function
    res.writeHead(200);
    res.write("OK");
    res.end();
};