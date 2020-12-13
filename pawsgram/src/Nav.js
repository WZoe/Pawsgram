import React, {Component} from 'react'

class Nav extends Component {
    render() {
        return (
            <div className="p-2 d-flex justify-content-around">
                <button className="btn ml-5"><img src={process.env.PUBLIC_URL + '/img/avatar.png'} width="50" height="50"
                                             className="d-inline-block align-top rounded-circle" alt=""/></button>
                {/*<span className="mb-0 h1 text-color-primary">Pawsgram</span>*/}
                <div className="btn-group">
                    <button className="btn btn-lg btn-dark">Timeline</button>
                    <button className="btn btn-lg btn-light">For You</button>
                </div>
                <button className="btn btn-clear">Log Out</button>
            </div>
        )
    }
}

export default Nav