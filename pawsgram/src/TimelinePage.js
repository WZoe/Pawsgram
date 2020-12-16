import React, {Component} from 'react'
import NewButton from "./NewButton";
import NewPost from "./NewPost";
import Like from "./Like";

class TimelinePage extends Component {
    // state = {
    //     user:{},
    //     // user:{
    //     //     user_id: 1,
    //     //     username: "Zoe",
    //     //     pet_name: "Graylind",
    //     //     avatar: "photo1.png",
    //     //     gender: "male",
    //     //     breed: "feline",
    //     //     color: "blue & white tabby",
    //     //     birthday: "2020/06/11"
    //     // },
    //     data:[]
    //     // data:[
    //     //     {
    //     //         id: 1,
    //     //         user_id:1,
    //     //         title: "Graylind's Weight",
    //     //         category: "Weight Tracking",
    //     //         date: "2020/12/15",
    //     //         description: "Graylind's Weight Description",
    //     //         likes: 5,
    //     //         private: false,
    //     //         photo: "",
    //     //         location: "St. Louis",
    //     //         weight: 3.3,
    //     //         future:true
    //     //     },
    //     //     {
    //     //         category: "Today",
    //     //         date: "2020/12/13"},
    //     //     {
    //     //         id: 1,
    //     //         user_id:1,
    //     //         title: "Graylind's Weight",
    //     //         category: "Weight Tracking",
    //     //         date: "2020/12/12",
    //     //         description: "Graylind's Weight DescriptionGraylind's Weight DescriptionGraylind's Weight DescriptionGraylind's Weight DescriptionGraylind's Weight DescriptionGraylind's Weight DescriptionGraylind's Weight DescriptionGraylind's Weight DescriptionGraylind's Weight DescriptionGraylind's Weight Description",
    //     //         likes: 5,
    //     //         private: true,
    //     //         photo: ["photo2.jpeg", "photo1.png", "photo3.jpg"],
    //     //         vac_name:"rabies",
    //     //         location: "St. Louis",
    //     //     },
    //     //     {
    //     //         id: 1,
    //     //         user_id:1,
    //     //         title: "Graylind's Weight",
    //     //         category: "Weight Tracking",
    //     //         date: "2020/12/12",
    //     //         description: "Graylind's Weight Description",
    //     //         likes: 5,
    //     //         private: false,
    //     //         photo: ["photo1.png", "photo1.png", "photo1.png"],
    //     //         location: "St. Louis",
    //     //     },
    //     //     {
    //     //         id: 1,
    //     //         user_id:1,
    //     //         title: "Graylind's Weight",
    //     //         category: "Weight Tracking",
    //     //         date: "2020/12/12",
    //     //         likes: 5,
    //     //         private: false,
    //     //     },
    //     //     {
    //     //         id: 1,
    //     //         user_id:1,
    //     //         title: "Graylind's Weight",
    //     //         category: "Weight Tracking",
    //     //         date: "2020/12/12",
    //     //         description: "Graylind's Weight Description",
    //     //         likes: 5,
    //     //         private: false,
    //     //         photo: "",
    //     //         location: "St. Louis",
    //     //     },
    //     //     {
    //     //         id: 1,
    //     //         user_id:1,
    //     //         title: "Graylind's Weight",
    //     //         category: "Weight Tracking",
    //     //         date: "2020/12/12",
    //     //         description: "Graylind's Weight Description",
    //     //         likes: 5,
    //     //         private: false,
    //     //         photo: "",
    //     //         location: "St. Louis",
    //     //     },
    //     //
    //     // ],
    // }

    newPost = (info) => {
        const endpoint = "http://ec2-18-206-208-42.compute-1.amazonaws.com:3000"
        const api = "/events/create"
        const url = endpoint + api

        info['date'] = info.year + '/' + info.month + '/' + info.date
        info["current_user_id"] = localStorage.getItem("current_user_id")

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then((result) => result.json())
            .then((result) => {
                this.props.updateError(result)
                if (result.success) {
                    //success, update timeline
                    this.props.setTimelineOwner(localStorage.getItem("current_user_id"), true)
                    return result
                } else {
                    //failed, return {success:false, msg:}
                    return result
                }
            })
    }

    componentDidMount() {
        // this.props.fetchTimeline()
        window.scrollTo(0, 0)
    }

    render() {
        const {user, data} = this.props.posts
        const {currentUser, page, timelineOwner} = this.props

        const posts = data.map((entry, index) => {
            if (entry.title) {
                let eventCSS = "col-auto postContent rounded align-self-center"
                if (entry.future) {
                    eventCSS += " color-gray"
                } else {
                    eventCSS += " color-light"
                }

                const catColor = {
                    General: "badge badge-primary",
                    Activity: "badge badge-primary color-activity",
                    Memorial: "badge badge-primary color-memorial",
                    "Weight Tracking": "badge badge-primary color-weight",
                    Vaccination: "badge badge-primary color-vac",
                    "Vet Visit": "badge badge-primary color-vet",
                    Generated: "badge badge-primary color-memorial",
                }

                const cat = entry.category === "Generated" ? "Memorial" : entry.category

                return (
                    <li className="post row" id={entry._id} key={index}>
                        <div className="postTimeline col-3">
                            <h3>{entry.date}</h3>
                            <h5><span className={catColor[cat]}>{cat}</span></h5>
                            <h3 className="likes"><i className="fas fa-heart mr-2"></i><i
                                className="fas fa-times"> {entry.likes}</i></h3>
                            {localStorage.getItem("current_user_id") !== timelineOwner.user_id &&
                            <Like event_id={entry._id} index={index} likePlus={this.props.likePlus}/>
                            }
                        </div>
                        <div className={eventCSS}>
                            <h3>{entry.private && <i className="fas fa-eye-slash mr-2"></i>}{entry.title}</h3>
                            {entry.location && <h5 className="font-italic ">{entry.location}</h5>}
                            {entry.weight &&
                            <p><span className="tagName rounded mr-2">Weight</span>{entry.weight}kg</p>}
                            {entry.vac_name &&
                            <p><span className="tagName rounded mr-2">Vaccination</span>{entry.vac_name}</p>}
                            {entry.reason &&
                            <p><span className="tagName rounded mr-2">Symptoms</span>{entry.reason}</p>}
                            {entry.medication &&
                            <p><span className="tagName rounded mr-2">Medication</span>{entry.medication}</p>}
                            {entry.description && <p>{entry.description}</p>}
                            {/*photos*/}
                            {entry.photo &&
                            <div className="photos">
                                <div className="photo m-1 rounded"><img className="rounded"
                                                                        src={process.env.PUBLIC_URL + '/img/' + entry.photo[0]}
                                                                        alt=""/></div>
                                <div className="photo m-1 rounded"><img className="rounded"
                                                                        src={process.env.PUBLIC_URL + '/img/' + entry.photo[1]}
                                                                        alt=""/></div>
                                <div className="photo m-1 rounded"><img className="rounded"
                                                                        src={process.env.PUBLIC_URL + '/img/' + entry.photo[2]}
                                                                        alt=""/></div>
                                <div className="photo m-1 rounded"><img className="rounded"
                                                                        src={process.env.PUBLIC_URL + '/img/' + entry.photo[2]}
                                                                        alt=""/></div>
                            </div>
                            }
                        </div>
                    </li>
                )
            } else {
                return (
                    <li className="post row" key={index}>
                        <div className="postTimeline col-3">
                            <h3 className="text-color-primary" id="today">{entry.date}</h3>
                            <h5><span className="badge badge-today">{entry.category}</span></h5>
                        </div>
                        <div className="col-9 postContent color-white postToday">
                        </div>
                    </li>
                )
            }
        })
        return (
            <ul className="postList">
                <NewButton currentUser={currentUser} page={page} timelineOwner={timelineOwner} newPost={this.newPost}/>
                <NewPost newPost={this.newPost}/>
                {/*Pet info*/}
                <div className="row">
                    <div className="col-3 postTimeline">
                        <img src={process.env.PUBLIC_URL + user.avatar} width="200" height="200"
                             className="d-inline-block align-top rounded-circle" alt=""/>

                    </div>
                    <div className="col-9 postContent color-white">
                        <h1 className="">{user.pet_name}</h1>
                        <h5>Owner: {user.username}</h5>
                        <h5>Gender: {user.gender === "male" ? <i className="fas fa-mars"></i> :
                            <i className="fas fa-venus"></i>}</h5>
                        <h5>Breed: {user.breed}</h5>
                        <h5>Color: {user.color}</h5>
                        <h5>Birthday: {user.birthday}</h5>
                    </div>
                </div>
                {posts}
            </ul>
        )
    }
}

export default TimelinePage