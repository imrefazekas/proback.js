let stopper = async function ( promise ) {
	let timestamp = Date.now()
	await promise
	return Date.now() - timestamp
}

console.log( stopper( new Promise( () => {} ) ) )
