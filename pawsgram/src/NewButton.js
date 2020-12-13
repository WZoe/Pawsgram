import React, {Component} from 'react'

class NewButton extends Component {
    render() {
        return (
            <div>
                <a className="btn btn-secondary btn-lg rounded-circle mb-4" href="#today"><i className="fas fa-map-marker-alt fa-1x"></i></a><span className="ml-2 text-secondary h5">Today</span><br/>
                <button className="btn btn-primary btn-lg rounded-circle"><i className="fas fa-plus fa-1x"></i></button><span className="ml-2 text-primary h5">New Post</span>
            </div>
        )
    }
}

export default NewButton