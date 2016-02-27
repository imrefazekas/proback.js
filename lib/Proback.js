module.exports = {
	handler: function ( callback, resolve, reject ) {
		return function (err, res) {
			if ( err ) {
				if ( callback )
					callback(err)
				return reject(err)
			}
			if ( callback )
				callback(null, res)
			resolve(res)
		}
	},
	resolver: function (res, callback, resolve) {
		if ( callback )
			callback( null, res )
		resolve( res )
	},
	rejecter: function (err, callback, reject) {
		if ( callback )
			callback(err)
		reject( err )
	}
}
