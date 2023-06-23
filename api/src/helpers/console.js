const dev = true;
module.exports = (message, arg=null) => {
	if(!dev) return;
	console.log(arg? `${arg} : ` : '', message);
}