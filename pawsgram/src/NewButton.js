import React, {Component} from 'react'
import NewPost from "./NewPost";

class NewButton extends Component {
    render() {
        const {currentUser, page, timelineOwner} = this.props

        return (
            <div className="newButton">
                <a className="btn btn-secondary btn-lg rounded-circle mb-4" href="#top"><i className="fas fa-chevron-up"></i></a><span className="ml-2 text-secondary h5">Top</span><br/>
                {page==="Timeline" && <div><a className="btn btn-secondary btn-lg rounded-circle mb-4" href="#today"><i className="fas fa-map-marker-alt fa-1x"></i></a><span className="ml-2 text-secondary h5">Today</span><br/></div>}
                {page==="Timeline" && currentUser.logged_in && currentUser.user_id===timelineOwner.user_id && <div><a className="btn btn-primary btn-lg rounded-circle" data-toggle="modal" data-target="#newPost"><i className="fas fa-plus fa-1x"></i></a><span className="ml-2 text-primary h5">New Post</span></div>}
            </div>
        )
    }
}

export default NewButton