import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {

    onToggle = this.onToggle.bind(this);
    state = {
        userid: 0,
        firstname: '',
        lastname: '',
        homeaddress: '',
        email: '',
        password: '',
        dropdownOpen: false,
        items: []
        //preferredDrinks: '',  //to be implemented
        //preferredRoutes: '', //to be implmeneted
        //friends: '', //to be implemented
        //barblacklist: '' //to be implemented
    }
    getItems() { //likely a better way to do this... Used to populate the friends drop down menu
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(items => this.setState({ items }))
            .catch(err => console.log(err))
    }

    onToggle() { //drop down menu tool
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitFormAdd = e => { //ADD user submisssion
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
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(item => {
                if (Array.isArray(item)) {
                    this.props.addItemToState(item[0])
                    this.props.toggle()
                } else {
                    console.log('failure')
                }
            })
            .catch(err => console.log("This is my error", err))
    }

    submitFormEdit = e => {  //Edit User Submission
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
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(item => {
                if (Array.isArray(item)) {
                    console.log(item)
                    this.props.updateState(item[0])
                    this.props.toggle()
                } else {
                    console.log('failure')
                }
            })
            .catch(err => console.log(err))
    }
    // preferreddrinks: this.state.preferreddrinks, //to be implemented
    // preferredroutes: this.state.preferredroutes, //to be implemented
    // friends: this.state.friends, //to be implemented
    // barblacklist: this.state.barblacklist //to be implemented
    addFriends = e => { //ADD user submisssion
        console.log("attempting to add new user")
        e.preventDefault()
        fetch('http://localhost:3000/users', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: this.temp.userid,
                friend_id: this.friend_id
            })
        })
            .then(response => response.json())
            .then(item => {
                if (Array.isArray(item)) {
                    this.props.addItemToState(item[0])
                    this.props.toggle()
                } else {
                    console.log('failure')
                }
            })
            .catch(err => console.log("This is my error", err))
    }


    componentDidMount() {
        //console.log("Did Mount")
        this.getItems()
        // if item exists, populate the state with proper data
        if (this.props.item) {
            // const { userid, firstname, lastname, homeaddress, email, preferreddrinks, preferredroutes, friends, barblacklist } = this.props.item
            // this.setState({ userid, firstname, lastname, homeaddress, email, preferreddrinks, preferredroutes, friends, barblacklist })
            const { userid, firstname, lastname, homeaddress, email, password } = this.props.item
            this.setState({ userid, firstname, lastname, homeaddress, email, password })
        }
    }

    render() {
        const items = this.state.items.map(temp => {
            return (
                <option id={temp.userid}>{temp.firstname} {temp.lastname}</option>
            )
        })

        return (
            <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
                <FormGroup>
                    <Label for="firstname">First Name</Label>
                    <Input type="text" name="firstname" id="firstname" onChange={this.onChange} value={this.state.firstname === null ? '' : this.state.firstname} />
                </FormGroup>
                <FormGroup>
                    <Label for="lastname">Last Name</Label>
                    <Input type="text" name="lastname" id="lastname" onChange={this.onChange} value={this.state.lastname === null ? '' : this.state.lastname} />
                </FormGroup>
                <FormGroup>
                    <Label for="homeaddress">Address</Label>
                    <Input type="text" name="homeaddress" id="homeaddress" onChange={this.onChange} value={this.state.homeaddress === null ? '' : this.state.homeaddress} placeholder="City, State" />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email} placeholder="johnDoe@gmail.com" />
                </FormGroup>
                <FormGroup>
                    <Label for="friends">Friends</Label>
                    <Input type="select" name="Friends" id="friends" multiple>
                        {items}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" onChange={this.onChange} value={this.state.password === null ? '' : this.state.password} />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        );
    }
}
export default AddEditForm;