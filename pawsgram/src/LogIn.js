import React, {Component} from 'react'

class LogIn extends Component {
    render() {
        const {currentUser, page, timelineOwner} = this.props

        return (
            <div className="modal fade" id="logIn" tabIndex="-1" role="dialog"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Create New Group</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" id="newGroupModalBody">
                            {/*form group is modified from https://getbootstrap.com/docs/4.0/components/forms/-->*/}
                            <div className="form-group">
                                <label htmlFor="groupname">Group Name </label>
                                <input className="form-control" type="text" id="groupname" name="groupname"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="members">Members</label>
                                <input className="form-control" type="text" id="members" name="members"
                                       placeholder="Alex Bob Cathy"/>
                                <small id="membershelp" className="form-text text-muted">Please use whitespace to
                                    separate the
                                    additional usernames.</small>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" id="newgroup">Create</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LogIn


