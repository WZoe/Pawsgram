import React, {Component} from 'react'

class Nav extends Component {
    render() {
        // use user props to determine user state
        const user = this.props.user
        return (
            <div className="p-2 d-flex justify-content-around align-items-center">
                <button className="btn ml-5 "><img src={process.env.PUBLIC_URL + '/img/photo1.png'} width="50" height="50"
                                             className="d-inline-block align-top rounded-circle" alt=""/><span className="h1 ml-2 text-color-primary ">Graylind</span></button>
                <div className="btn-group">
                    <button className="btn btn-lg btn-dark">Timeline</button>
                    <button className="btn btn-lg btn-light">Discover</button>
                </div>
                <button className="btn btn-lg btn-clear">Log Out</button>
            </div>

            // guest ver.
        // <div className="p-2 d-flex justify-content-around">
        //     <span className="mb-0 h1 text-color-primary"><i className="fas fa-paw"></i> Pawsgram</span>
        //     <div className="btn-group">
        //         <button className="btn btn-lg btn-dark">Discover</button>
        //     </div>
        //     <button className="btn btn-lg btn-primary">Log In</button>
        // </div>
        )
    }
}

export default Nav