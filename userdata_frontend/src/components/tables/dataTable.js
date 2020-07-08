import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../modal/modal'
console.log("about to create table")
class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch('http://localhost:3000/users', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }
  }

  render() {
    const items = this.props.items.map(item => {
      return (
        <tr key={item.userid}>
          <th scope="row">{item.userid}</th>
          <td>{item.firstname}</td>
          <td>{item.lastname}</td>
          <td>{item.homeaddress}</td>
          <td>{item.email}</td>
          <td>Blank</td>
          <td>Blank</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.userid)}>Del</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First</th>
            <th>Last</th>
            <th>Address</th>
            <th>Email</th>
            <th>Drinks</th>
            <th>Routes</th>
            <th>Friends</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}
// Note several columns blank place holders until 
export default DataTable;