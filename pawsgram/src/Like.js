import React, {Component} from 'react'
import NewButton from "./NewButton";
import NewPost from "./NewPost";

class Like extends Component {
    like=()=>{
            const endpoint = "http://ec2-18-206-208-42.compute-1.amazonaws.com:3000"
            const api="/events/like"
            const url = endpoint+api

            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({event_id: this.props.event_id})
            })
                .then((result) => result.json())
                .then((result) => {
                    console.log(result)
                    console.log(this.props.event_id)
                    if (result.success) {
                        //success
                        this.props.likePlus(this.props.index)
                        return result
                    } else {
                        //failed, return {success:false, msg:}
                        return result
                    }
                })

}

    render() {
        return (
            <button className="btn btn-danger" onClick={this.like}><i className="fas fa-heart mr-2"></i>+ 1 </button>
        )
    }
}

export default Like