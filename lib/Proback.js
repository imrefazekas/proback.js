module.exports = {
	stopper: async function ( promise ) {
		let timestamp = Date.now()
		await promise
		return Date.now() - timestamp
	},
	timeout: function (ms) {
		return new Promise(resolve => setTimeout(resolve, ms))
	},
	until: function ( fn, ms = 100 ) {
		return new Promise(resolve => {
			let pingInterval = setInterval( function () {
				if ( fn() ) {
					clearInterval( pingInterval )
					resolve()
				}
			}, ms )
		} )
	},
	performer: function (promise, callback, resolve, reject) {
		promise
			.then( (res) => { module.exports.resolver(res, callback, resolve) } )
			.catch( (reason) => { module.exports.rejecter(reason, callback, reject) } )
	},
	embracer: function (promise, callback) {
		return new Promise( (resolve, reject) => {
			promise
				.then( (res) => { module.exports.resolver(res, callback, resolve) } )
				.catch( (reason) => { module.exports.rejecter(reason, callback, reject) } )
		} )
	},
	quicker: function ( res, callback ) {
		return new Promise( (resolve, reject) => {
			if (callback) callback( null, res )
			resolve(res)
		} )
	},
	thrower: function ( err, callback ) {
		return new Promise( (resolve, reject) => {
			if (callback) callback( err )
			reject(err)
		} )
	},
	syncAll: function (promises) {
		if (!Array.isArray(promises)) {
			throw new Error('First argument need to be an array of Promises')
		}

		return new Promise((resolve, reject) => {
			let count = 0
			let results = []

			const iterateeFunc = (previousPromise, currentPromise) => {
				return previousPromise
					.then(function (result) {
						if (count++ !== 0) results = results.concat(result)
						return currentPromise(result, results, count)
					})
					.catch((err) => {
						return reject(err)
					})
			}

			promises = promises.concat(() => { return Promise.resolve() } )

			promises
				.reduce(iterateeFunc, Promise.resolve(false))
				.then(function (res) {
					resolve(results)
				})
		})
	},
	forAll: function ( promises, callback, defaultRes ) {
		return new Promise( (resolve, reject) => {
			Promise.all( promises )
				.then( (res) => {
					if (callback) callback(null, defaultRes || res)
					resolve( defaultRes || res )
				} )
				.catch( (reason) => {
					if (callback) callback(reason)
					reject( reason )
				} )
		} )
	},
	handler: function ( callback, resolve, reject ) {
		return function (err, res) {
			if ( err ) {
				callback && callback( err, null )
				reject && reject(err)
			}
			else {
				callback && callback( null, res )
				resolve && resolve(res)
			}
		}
	},
	returner: function ( err, res, callback, resolve, reject ) {
		if ( err ) {
			callback && callback( err, null )
			reject && reject(err)
		}
		else {
			callback && callback( null, res )
			resolve && resolve(res)
		}
	},
	resolver: function (res, callback, resolve) {
		callback && callback( null, res )
		resolve && resolve( res )
	},
	rejecter: function (err, callback, reject) {
		callback && callback( err, null )
		reject && reject( err )
	}
}
