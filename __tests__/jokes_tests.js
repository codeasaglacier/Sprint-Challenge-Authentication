const env = require( "dotenv" ).config()
const supertest = require( "supertest" )
const server = require( "../api/server" )
const db = require( "../database/dbConfig" )


describe( "test jest", () => {
  it( "runs test w/o failing", () => {
    expect( false ).toBeFalsy()
  } )
} )

// beforeAll( async () => {
//   await db.truncate()
// } )

afterAll( async () => {
  await db.destroy()
} )

const randomName = "Frodo" + Math.random()* 10000000
describe( "jokes integration tests", () => {
  it ( "POST /api/auth/register", async () => {
    const data = { username: randomName, password: "Baggins" }
    const res = await supertest( server ).post( "/api/auth/register" ).send( data )
    console.log( res.body.username )
    expect( res.type ).toBe( "application/json" )
    expect( res.body.username ).toBe( randomName )
    expect( res.statusCode ).toBe( 201 )
  } )

  let token

  it ( "POST /api/auth/login", async () => {
    const data = { username: randomName, password: "Baggins" }
    const res = await supertest( server ).post( "/api/auth/login" ).send( data )
    console.log( res.body.message )
    expect( res.body.message ).toBe( `Welcome ${ randomName }!` )
    expect( res.statusCode ).toBe( 200 )
    token = res.body.token
  } )

  it ( "GET /api/jokes",  async () => {
    const res = await supertest( server ).get( "/api/jokes" ).set( { "Authorization": token } )
    expect( res.statusCode ).toBe( 200 )
  } )

} )