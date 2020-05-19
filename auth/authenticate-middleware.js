const jwt = require( "jsonwebtoken" )


function restrict() {
  const authError = {
    message: "Invalid credentials",
  }
	return async ( req, res, next ) => {
      console.log( 1 )
		try {
			// const token = req.cookies.token
			const token = req.headers.authorization
      console.log( 2 )
			if ( !token ) {
				return res.status( 401 ).json( authError )
			}
      console.log( 3 )
			jwt.verify( token, process.env.JWT_SECRET, ( err, decoded ) => {
				if ( err ) {
					return res.status( 401 ).json( authError )
        }
        console.log( 4 )
        req.token = decoded
				next()
			} )
		} catch(err) {
			next(err)
		}
	}
}

module.exports = restrict