  
const pg = require('pg');
//const queries = require("./models/users.js");

//Manually run this works correctly. 

module.exports = (pool) => {

    const db = {};

    //creates a user...no required fields at this time
    //#TODO error checking to make sure at minimum firstname, lastname, and email are entered. 
    db.createUser = async ({firstName, lastName, homeAddress, email, preferredDrinks, preferredRoutes, friends, barBlacklist }) => {
        return (await pool.query(`INSERT INTO "user_data" ("firstname", "lastname", "homeaddress", "email", "preferreddrinks", "preferredroutes", "friends", "barblacklist") 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING userid`, [firstName, lastName, homeAddress, email, preferredDrinks, preferredRoutes, friends, barBlacklist])).rows[0].userid
        //response.status(201).send(`New User added with ID: ${result.insertId}`)
    }

    //#TODO Has to be a better way to implement this
    db.updateUser = async (userid, { firstName, lastName, homeAddress, email, preferredDrinks, preferredRoutes, friends, barBlacklist }) => {
        if (firstName) {
            await pool.query(`UPDATE user_data SET firstname = $2 WHERE userid = $1`, [userid, firstName])
        }
        if (lastName) {
            await pool.query(`UPDATE user_data SET lastname = $2 WHERE userid = $1`, [userid, lastName])
        }
        if (homeAddress) {
            await pool.query(`UPDATE user_data SET homeaddress = $2 WHERE userid = $1`, [userid, homeAddress])
        }
        if (email) {
            await pool.query(`UPDATE user_data SET email = $2 WHERE userid = $1`, [userid, email])
        }
        if (preferredDrinks) {
            await pool.query(`UPDATE user_data SET preferreddrinks = $2 WHERE userid = $1`, [userid, preferredDrinks])
        }
        if (preferredRoutes) {
            await pool.query(`UPDATE user_data SET preferredroutes = $2 WHERE userid = $1`, [userid, preferredRoutes])
        }
        if (friends) {
            await pool.query(`UPDATE user_data SET friends = $2 WHERE userid = $1`, [userid, friends])
        }
        if (barBlacklist) {
            await pool.query(`UPDATE user_data SET barblacklist = $2 WHERE userid = $1`, [userid, barBlacklist])
        }
        //response.status(200).send(`User modified with ID: ${id}`)
    }
    // Deletes user as intended
    db.deleteUser = async (userid) => {
        await pool.query(`DELETE FROM user_data WHERE userid = $1`, [userid])
    }

    // pulls user data where appropriate
    db.userDetails = async (userid) => {
        let res;
        console.log("In Users.js")
        if (userid) {
            res = await pool.query('SELECT * FROM user_data WHERE userid = $1', [userid])
            //console.log(res)
        } else {
            res = await pool.query('SELECT * FROM user_data')
        }
        return res;

    }
    return db;
}

