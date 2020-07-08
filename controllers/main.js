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
    const { firstname, lastname , homeaddress, email } = req.body
    const added = new Date()
    db('user_data').insert({ firstname, lastname , homeaddress, email, added})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  // Updates an existing table row given USERID
  const putTableData = (req, res, db) => {
    const { userid,  firstname, lastname , homeaddress, email  } = req.body
    db('user_data').where({userid}).update({ firstname, lastname , homeaddress, email})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  //Deletes a row from table given USERID 
  const deleteTableData = (req, res, db) => {
    const { userid } = req.body
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
    deleteTableData
  }