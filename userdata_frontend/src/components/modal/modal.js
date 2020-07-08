import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddEditForm from '../forms/addEditForm'

class ModalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }
// ##TODO Need to create a branching Render for different views.   
// Page 1 Login Page -- email/password fields -- check database return userId/User Role
// Page 2 Admin Page (if role is admin) -- display all users and buttons
// Page 3 User page (if role != admin) -- pull userid -- display thier data + buttons for update profile/addfriends/addroutes/adddrinks

  render() {
      const closeBtn = <button className="close" onClick={this.toggle}>&times;</button> //&times;  Not sure what that does

      const label = this.props.buttonLabel

      let button = ''
      let title = ''

      if(label === 'Edit'){
        button = <Button
                  color="warning"
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>{label}
                </Button>
        title = 'Edit User'
      } else if(label === 'Add Friends'){
        button = <Button
                    color="warning"
                    onClick={this.toggle}
                    style={{float: "left", marginRight:"10px"}}>{label}
                </Button>
        title = 'Add Friends'
          
      } else {
        button = <Button
                  color="success"
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>{label}
                </Button>
        title = 'Add New User'
      }


      return (
      <div>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
          <ModalBody>
            <AddEditForm
              addItemToState={this.props.addItemToState}
              updateState={this.props.updateState}
              toggle={this.toggle}
              item={this.props.item} />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ModalForm