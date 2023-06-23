module.exports = (req) => {
	return `${req.protocol}://${req.headers.host}`;
	// return `${req.protocol}s://${req.headers.host}`;
}