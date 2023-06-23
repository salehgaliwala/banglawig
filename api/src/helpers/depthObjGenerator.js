const depthObjGenerator =  (objRef, iterableProperty, depth) => {
	const arr = new Array(depth).fill(objRef);
	console.log({arr})
	return arr.reduce((prev, current) => {
		current[iterableProperty] = {...prev};
		return current;
	});
}

module.exports = depthObjGenerator;