import React, {Component} from 'react'

class LogIn extends Component {
    state = {
        username:'',
        password:'',
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
            <div className="modal fade" id="logIn" tabIndex="-1" role="dialog"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Log In</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" id="logInBody">
                            {/*form group is modified from https://getbootstrap.com/docs/4.0/components/forms/-->*/}
                            <div className="form-group">
                                <label htmlFor="username">Username </label>
                                <input className="form-control" type="text" id="username" name="username" value={this.state.username} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input className="form-control" type="password" id="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" id="logInSubmit" data-dismiss="modal" data-target="#logIn" onClick={()=>{this.props.userLogIn(this.state.username, this.state.password)}}>log In</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LogIn


