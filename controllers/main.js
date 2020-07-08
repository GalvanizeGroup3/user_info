// Returns All data from table 
console.log("Made it to the database functions")
const getTableData = (req, res, db) => {

    db.select('*').from('user_data')
      .then(items => {
        if(items.length){
          res.json(items)
          //console.log(db)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  // Adds a new row to the table with (currently 4 fields)
  const postTableData = (req, res, db) => {
    const { firstname, lastname , homeaddress, email, password} = req.body
    const added = new Date()
    db('user_data').insert({ firstname, lastname , homeaddress, email, password}) //removed field "added" just noted this was a time stamp for creation 
      .returning('temp_id')
      //console.log(user_id)
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
    }

    const getlLastTableEntry = (req, res, db) => {   
        db.select('userid').from('user_data').orderby('userid DESC').limit(1)
        .then(items => {
        if(items.length){
            res.json(items)
            //console.log(db)
        } else {
            res.json({dataExists: 'false'})
        }
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
    }

    const postFriendData = (req, res, db) => {
        const { friend_id } = req.body
        db('friends').insert({ user_id, friend_id}) //removed field "added"
        .returning('*')
        .then(item => {
            res.json(item)
        })
        .catch(err => res.status(400).json({dbError: 'db error'}))
    }

  // Updates an existing table row given USERID
  const putTableData = (req, res, db) => {
    const { userid,  firstname, lastname , homeaddress, email, password  } = req.body
    db('user_data').where({userid}).update({ firstname, lastname , homeaddress, email, password})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  //Deletes a row from table given USERID 
  // ##Fixed req.body was passing in the variable incorrectly... forced the reassignment to proper format
  const deleteTableData = (req, res, db) => {
    const {userid} = {userid: req.body.id}
    db('user_data').where({userid}).del()
      .then(() => {
        res.json({delete: 'true'})
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  module.exports = {
    getTableData,
    postTableData,
    putTableData,
    deleteTableData,
    getlLastTableEntry,
    postFriendData
  }