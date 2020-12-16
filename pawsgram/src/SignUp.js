import React, {Component} from 'react'

class SignUp extends Component {
    state = {
        username: '',
        password: '',
        pet_name: '',
        avatar: 'avatar.png',
        gender: 'male',
        breed: '',
        color: '',
        year: '2020',
        month: '1',
        date: '1'
    }
// cited from https://www.taniarascia.com/getting-started-with-react/
    handleChange = (event) => {
        const {name, value} = event.target

        this.setState({
            [name]: value,
        })
    }

    componentDidMount() {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        this.setState({
            date: date,
            month: month,
            year: year
        })
    }

    render() {
        const {currentUser, page, timelineOwner} = this.props

        return (
            <div className="modal fade" id="signUp" tabIndex="-1" role="dialog"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Join the Pawsgram family!</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" id="signUpBody">
                            {/*form group is modified from https://getbootstrap.com/docs/4.0/components/forms/-->*/}
                            <h4>User Information</h4>
                            <div className="form-group">
                                <label htmlFor="username">Username </label>
                                <input className="form-control" type="text" name="username" value={this.state.username}
                                       onChange={this.handleChange}/>
                                <small className="form-text text-muted">You will use this to log into your account. It
                                    should be unique.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input className="form-control" type="password" name="password"
                                       value={this.state.password} onChange={this.handleChange}/>
                            </div>
                            <h4>Pet Information</h4>
                            <div className="form-group">
                                <label>Pet Name</label>
                                <input className="form-control" type="text" name="pet_name" value={this.state.pet_name}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>Breed</label>
                                <input className="form-control" type="text" id="breed" name="breed"
                                       value={this.state.breed} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>Color</label>
                                <input className="form-control" type="text" id="color" name="color"
                                       value={this.state.color} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>Birthday</label>
                                <div className="row">
                                    <input type="number" min="1970" max="2100"
                                           className="ml-3 form-control col-2 mr-2 year" name="year"
                                           value={this.state.year} onChange={this.handleChange}/>
                                    <label className="m-2">/</label>
                                    <input type="number" min="1" max="12"
                                           className="form-control col-2 mr-2 month" name="month"
                                           value={this.state.month} onChange={this.handleChange}/>
                                    <label className="m-2">/</label>
                                    <input type="number" min="1" max="31" className="form-control col-2 date"
                                           name="date"
                                           value={this.state.date} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="mr-3">Gender</label>
                                <input className="form-chek-input mr-2" type="radio" id="gender" name="gender"
                                       value="male" onChange={this.handleChange}/><label
                                className="form-check-label mr-3"><i className="fas fa-mars"></i></label>
                                <input className="form-chek-input mr-2" type="radio" id="gender" name="gender"
                                       value="female" onChange={this.handleChange}/><label
                                className="form-check-label"><i className="fas fa-venus"></i></label>
                            </div>
                            <div className="form-group">
                                <label>Profile Photo</label>
                                <input className="form-control" type="text" id="avatar" name="avatar"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" id="signUpSubmit" data-dismiss="modal"
                                    data-target="#signUp" onClick={() => {
                                this.props.userSignUp(this.state)
                            }}>Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp


