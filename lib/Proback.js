module.exports = {
	handler: function ( callback, resolve, reject ) {
		return function (err, res) {
			if ( err ) {
				callback && callback( err, null )
				return reject(err)
			}
			callback && callback( null, res )
			resolve(res)
		}
	},
	returner: function ( err, res, callback, resolve, reject ) {
		if ( err ) {
			callback && callback( err, null )
			return reject(err)
		}
		callback && callback( null, res )
		resolve(res)
	},
	resolver: function (res, callback, resolve) {
		callback && callback( null, res )
		resolve( res )
	},
	rejecter: function (err, callback, reject) {
		callback && callback( err, null )
		reject( err )
	}
}
