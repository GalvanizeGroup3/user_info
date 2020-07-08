  
const pg = require('pg');
const queries = require("../src/models/users.js");

(async () => {

    const Pool = pg.Pool
    const pool = new Pool({
        user: 'me',
        host: 'localhost',
        database: 'users',
        password: '!QAZxsw2',
        port: 5432,
    })

try { //Primarily used for testing and rebuilding DB 
    await pool.query(`
        DROP TABLE IF EXISTS user_data
    `);


    // NOTE on DB creation all column names are forced lowercase... 
await pool.query(`
CREATE TABLE user_data(
    userId serial PRIMARY KEY,
    firstName varchar(50),
    lastName varchar(50),
    homeAddress text, 
    email varchar(255),
    preferredDrinks text,
    preferredRoutes text,
    friends text,
    barBlacklist text
    password varchar(64)
    )
    `);

    await pool.query(`
CREATE TABLE friends(
    id serial PRIMARY KEY,
    user_id int,
    friend_id int
    )
    `);
//#TODO create join tables for preferredDrinks, preferredRoutes, Friends, barBlacklist

        console.log("Complete!");

    } catch (error) {
        console.error("######  DATABASE ERROR  ######")
        console.error(error)
    }

    const users = queries(pool)

    //Runs through a few validations to ensure functionilty works.  
    var matthewID = await users.createUser({ firstName: "matthew", lastName: "howard", homeAddress: "1600 Pennsylvania Avenue NW, Washington, DC 20500", email: "myemail@gmail" });
    var aliceID = await users.createUser({ firstName: "alice", lastName: "howard", homeAddress: "First St SE, Washington, DC 20004", email: "other@gmail" });
    await users.deleteUser(1);
    var bobID = await users.createUser({ firstName: "bob", lastName: "howard", homeAddress: "Nope!", email: "foo@gmail" });
    console.log(await users.userDetails(matthewID))
    console.log(await users.userDetails(aliceID))
    console.log(await users.userDetails())
    await users.updateUser(bobID, { email: "bar@gmail.com" });
    await pool.end();
})();