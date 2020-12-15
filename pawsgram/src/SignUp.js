import React, {Component} from 'react'

class SignUp extends Component {
    state = {
        username:'',
        password:'',
        pet_name: '',
        avatar: '',
        gender:'',
        breed:'',
        color:'',
        year:'2020',
        month:'1',
        date:'1'
    }
// cited from https://www.taniarascia.com/getting-started-with-react/
    handleChange = (event) => {
        const {name, value} = event.target

        this.setState({
            [name]: value,
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
                                <input className="form-control" type="text" id="username" name="username"/>
                                <small className="form-text text-muted">You will use this to log into your account. It should be unique.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input className="form-control" type="password" id="password" name="password"/>
                            </div>
                            <h4>Pet Information</h4>
                            <div className="form-group">
                                <label >Pet Name</label>
                                <input className="form-control" type="text" id="password" name="password"/>
                            </div>
                            <div className="form-group">
                                <label >Breed</label>
                                <input className="form-control" type="text" id="breed" name="breed"/>
                            </div>
                            <div className="form-group">
                                <label >Color</label>
                                <input className="form-control" type="text" id="color" name="color"/>
                            </div>
                            <div className="form-group">
                                <label>Birthday</label>
                                <div className="row">
                                <input type="number" min="1970" max="2100" className="ml-3 form-control col-2 mr-2 year"
                                       value={this.state.year} onChange={this.handleChange}/>
                                <label className="m-2">/</label>
                                <input type="number" min="1" max="12"
                                       className="form-control col-2 mr-2 month"
                                       value={this.state.month} onChange={this.handleChange}/>
                                <label className="m-2">/</label>
                                <input type="number" min="1" max="31" className="form-control col-2 date"
                                       value={this.state.date} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label >Gender</label>
                                <input className="form-control" type="text" id="gender" name="gender"/>
                            </div>
                            <div className="form-group">
                                <label>Profile Photo</label>
                                <input className="form-control" type="text" id="avatar" name="avatar"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" id="signUpSubmit">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp


