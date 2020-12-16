import React, {Component} from 'react'
import NewButton from "./NewButton";
import NewPost from "./NewPost";
import Like from "./Like";

class DiscoverPage extends Component {
    state = {
        data: []
    }

    fetchDiscover =() => {
        const endpoint = "http://ec2-18-206-208-42.compute-1.amazonaws.com:3000"
        const api="/events/forYou"
        const url = endpoint+api

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                current_user_id:localStorage.getItem("current_user_id"),
            })
        })
            .then((result) => result.json())
            .then((result) => {
                if (result.success) {
                    //success, update timeline
                    console.log(result.data)
                    this.setState({
                        data: result.data
                    })
                    return result
                } else {
                    //failed, return {success:false, msg:}
                    return result
                }
            })
    }

    likePlus = (index) => {
        let newData = this.state.data
        newData[index].event.likes +=1
        this.setState({
            data: newData
        })
    }

    componentDidMount() {
        this.fetchDiscover()
    }

    render() {
        const {currentUser, page, timelineOwner} = this.props

        const posts = this.state.data.map((entry, index) => {
            const user=entry.user
            const event=entry.event
                const catColor ={
                    General: "badge badge-primary",
                    Activity: "badge badge-primary color-activity",
                    Memorial: "badge badge-primary color-memorial",
                    "Weight Tracking": "badge badge-primary color-weight",
                    Vaccination:"badge badge-primary color-vac",
                    "Vet Visit": "badge badge-primary color-vet",
                }

            const cat = event.category==="Generated"? "Memorial":event.category

            return (
                    <li className="post row" key={index} >
                        <div className="postTimeline col-3">
                            <button className="btn" onClick={()=>{
                                this.props.setTimelineOwner(event.user_id)
                                this.props.switchToTimeline()
                            }}>
                            <img src={process.env.PUBLIC_URL + user.avatar} width="100" height="100"
                                 className="d-inline-block align-top rounded-circle" alt=""/>
                            <h1 className="">{user.pet_name}</h1>
                            </button>
                            <h3>{event.date}</h3>
                            <h5>Owner:  {user.username}</h5>

                            <h5><span className={catColor[cat]}>{cat}</span></h5>
                            <h3 className="likes"><i className="fas fa-heart mr-2"></i><i className="fas fa-times"> {event.likes}</i></h3>
                            {localStorage.getItem("current_user_id")!==event.user_id &&<Like likePlus={this.likePlus} index={index} event_id={event._id}/>
                            }
                        </div>
                        <div className="col-auto postContent rounded align-self-center color-light" onClick={()=>{
                            this.props.setTimelineOwner(event.user_id)
                            this.props.switchToTimeline()
                        }}>
                            <h3>{event.title}</h3>
                            {event.location && <h5 className="font-italic ">{event.location}</h5>}
                            {event.weight && <p><span className="tagName rounded mr-2">Weight</span>{event.weight}kg</p>}
                            {event.vac_name && <p><span className="tagName rounded mr-2">Vaccination</span>{event.vac_name}</p>}
                            {event.reason && <p><span className="tagName rounded mr-2">Symptoms</span>{event.reason}</p>}
                            {event.medication &&<p><span className="tagName rounded mr-2">Medication</span>{event.medication}</p>}
                            {event.description && <p>{event.description}</p>}
                            {/*photos*/}
                            {event.photo &&
                            <div className="photos">
                                <div className="photo m-1 rounded"><img className="rounded" src={process.env.PUBLIC_URL + '/img/' + event.photo[0]} alt=""/></div>
                                <div className="photo m-1 rounded"><img className="rounded" src={process.env.PUBLIC_URL + '/img/' + event.photo[1]} alt=""/></div>
                                <div className="photo m-1 rounded"><img className="rounded" src={process.env.PUBLIC_URL + '/img/' + event.photo[2]} alt=""/></div>
                                <div className="photo m-1 rounded"><img className="rounded" src={process.env.PUBLIC_URL + '/img/' + event.photo[2]} alt=""/></div>
                            </div>
                            }
                        </div>
                    </li>
                )
        })


        return(
            <ul className="postList">
            <NewButton currentUser={currentUser} page={page} timelineOwner={timelineOwner} newPost={this.newPost}/>
            <div className="post row">
                <div className="col-3 postTimeline">
                    <div className="p-3 bg-primary text-light whatsnew">
                    <h1 className="">What's New</h1>
                    </div>
                </div>
            </div>
            {posts}
        </ul>
        )

    }
}

export default DiscoverPage