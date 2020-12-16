import React, {Component} from 'react'

class Nav extends Component {
    render() {
        // use user props to determine user state
        const {currentUser, page} = this.props

        let timelineBtn = <button className="btn btn-lg btn-light" onClick={() => {
            this.props.setTimelineOwner(this.props.currentUser.user_id, true);
        }}>Timeline</button>
        let timelineBtnSelected = <button className="btn btn-lg btn-dark" onClick={() => {
            this.props.setTimelineOwner(this.props.currentUser.user_id, true);
        }}>Timeline</button>
        let discoverBtn = <button className="btn btn-lg btn-light" onClick={() => {
            this.props.switchToDiscover()
        }}>Discover</button>
        let discoverBtnSelected = <button className="btn btn-lg btn-dark" onClick={() => {
            this.props.switchToDiscover()
        }}>Discover</button>

        if (currentUser.logged_in) {
            return (
                <nav id="navbar" className="color-light fixed-top">
                    <div className="p-2 d-flex justify-content-around align-items-center">
                        <button className="btn ml-5" onClick={() => {
                            this.props.setTimelineOwner(this.props.currentUser.user_id, true);
                        }}><img src={"http://ec2-18-206-208-42.compute-1.amazonaws.com:3000/" + currentUser.avatar}
                                width="50" height="50"
                                className="d-inline-block align-top rounded-circle"
                                alt=""/><span
                            className="h1 ml-2 text-color-primary ">{currentUser.pet_name}</span></button>
                        <div className="btn-group">
                            {page === "Timeline" && timelineBtnSelected}
                            {page === "Timeline" && discoverBtn}
                            {page === "Discover" && timelineBtn}
                            {page === "Discover" && discoverBtnSelected}
                        </div>
                        <button className="btn btn-lg btn-clear" onClick={() => {
                            this.props.userLogOut()
                        }}>Log Out
                        </button>
                    </div>
                </nav>
            )
        } else {
            return (
                <nav id="navbar" className="color-light fixed-top">
                    <div className="p-2 d-flex justify-content-around">
                        <span className="mb-0 h1 text-color-primary"><i className="fas fa-paw"></i> Pawsgram</span>
                        <div className="btn-group">
                            {discoverBtnSelected}
                        </div>
                        <div className="btn-group">
                            <button className="btn btn-lg btn-primary" data-toggle="modal" data-target="#logIn">Log In
                            </button>
                            <button className="btn btn-lg btn-secondary" data-toggle="modal" data-target="#signUp">Sign
                                Up
                            </button>
                        </div>
                    </div>
                </nav>
            )
        }
    }
}

export default Nav