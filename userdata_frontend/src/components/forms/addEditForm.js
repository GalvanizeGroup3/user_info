import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    userid: 0,
    firstname: '',
    lastname: '',
    homeaddress: '',
    email: ''
    //preferredDrinks: '',  //to be implemented
    //preferredRoutes: '', //to be implmeneted
    //friends: '', //to be implemented
    //barblacklist: '' //to be implemented
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
      console.log("attempting to add new user")
    e.preventDefault()
    fetch('http://localhost:3000/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        homeaddress: this.state.homeaddress,
        email: this.state.email
        // preferredDrinks: this.state.preferreddrinks, //to be implemented
        // preferredRoutes: this.state.preferredroutes, //to be implemented
        // friends: this.state.friends, //to be implemented
        // barblacklist: this.state.barblacklist //to be implemented
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log("This is my error",err))
  }

  submitFormEdit = e => {
    console.log("attempting to edit existing item")
    e.preventDefault()
    fetch('http://localhost:3000/users', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userid: this.state.userid,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        homeaddress: this.state.homeaddress,
        email: this.state.email
        // preferreddrinks: this.state.preferreddrinks, //to be implemented
        // preferredroutes: this.state.preferredroutes, //to be implemented
        // friends: this.state.friends, //to be implemented
        // barblacklist: this.state.barblacklist //to be implemented
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
        // const { userid, firstname, lastname, homeaddress, email, preferreddrinks, preferredroutes, friends, barblacklist } = this.props.item
        // this.setState({ userid, firstname, lastname, homeaddress, email, preferreddrinks, preferredroutes, friends, barblacklist })
      const { userid, firstname, lastname, homeaddress, email } = this.props.item
      this.setState({ userid, firstname, lastname, homeaddress, email })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="firstname">First Name</Label>
          <Input type="text" name="firstname" id="firstname" onChange={this.onChange} value={this.state.firstname === null ? '' : this.state.firstname} />
        </FormGroup>
        <FormGroup>
          <Label for="lastname">Last Name</Label>
          <Input type="text" name="lastname" id="lastname" onChange={this.onChange} value={this.state.lastname === null ? '' : this.state.lastname}  />
        </FormGroup>
        <FormGroup>
          <Label for="homeaddress">Address</Label>
          <Input type="text" name="homeaddress" id="homeaddress" onChange={this.onChange} value={this.state.homeaddress === null ? '' : this.state.homeaddress}  placeholder="City, State"/>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  placeholder="johnDoe@gmail.com" />
        </FormGroup>

        <Button>Submit</Button>
      </Form>
    );
  }
}
//{ <FormGroup>
//<Label for="location">Location</Label>
//<Input type="text" name="location" id="location" onChange={this.onChange} value={this.state.location === null ? '' : this.state.location}  placeholder="City, State" />
//</FormGroup>
//<FormGroup>
//<Label for="hobby">Hobby</Label>
//<Input type="text" name="hobby" id="hobby" onChange={this.onChange} value={this.state.hobby}  />
//</FormGroup> }
export default AddEditForm;