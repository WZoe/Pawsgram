import React, {Component} from 'react'
import NewButton from "./NewButton";

class TimelinePage extends Component {
    state = {
        user:{
            user_id: 1,
            username: "Zoe",
            pet_name: "Graylind",
            avatar: "photo1.png",
            gender: "male",
            breed: "feline",
            color: "blue & white tabby",
            birthday: "2020/06/11"
        },
        data:[
            {
            id: 1,
                user_id:1,
         title: "Graylind's Weight",
         category: "Weight Tracking",
         date: "2020/12/15",
         description: "Graylind's Weight Description",
         likes: 5,
         private: false,
         photo: "",
         location: "St. Louis",
         weight: 3.3,
                future:true
        },
            {
            category: "Today",
            date: "2020/12/13"},
            {
                id: 1,
                user_id:1,
                title: "Graylind's Weight",
                category: "Weight Tracking",
                date: "2020/12/12",
                description: "Graylind's Weight DescriptionGraylind's Weight DescriptionGraylind's Weight DescriptionGraylind's Weight DescriptionGraylind's Weight DescriptionGraylind's Weight DescriptionGraylind's Weight DescriptionGraylind's Weight DescriptionGraylind's Weight DescriptionGraylind's Weight Description",
                likes: 5,
                private: true,
                photo: ["photo2.jpeg", "photo1.png", "photo3.jpg"],
                vac_name:"rabies",
                location: "St. Louis",
            },
            {
                id: 1,
                user_id:1,
                title: "Graylind's Weight",
                category: "Weight Tracking",
                date: "2020/12/12",
                description: "Graylind's Weight Description",
                likes: 5,
                private: false,
                photo: ["photo1.png", "photo1.png", "photo1.png"],
                location: "St. Louis",
            },
            {
                id: 1,
                user_id:1,
                title: "Graylind's Weight",
                category: "Weight Tracking",
                date: "2020/12/12",
                likes: 5,
                private: false,
            },
            {
                id: 1,
                user_id:1,
                title: "Graylind's Weight",
                category: "Weight Tracking",
                date: "2020/12/12",
                description: "Graylind's Weight Description",
                likes: 5,
                private: false,
                photo: "",
                location: "St. Louis",
            },
            {
                id: 1,
                user_id:1,
                title: "Graylind's Weight",
                category: "Weight Tracking",
                date: "2020/12/12",
                description: "Graylind's Weight Description",
                likes: 5,
                private: false,
                photo: "",
                location: "St. Louis",
            },

        ],
    }
    componentDidMount() {
        const {currentUser, page, timelineOwner} = this.props
        // fetch posts of timeline
        if (page==="Timeline") {

        }
        // fetch posts of discover
        else {

        }
    }
    render() {
        const {user,data} = this.state
        const {currentUser, page, timelineOwner} = this.props
        // 后端传数据来的时候在today哪里加一个事件

        // TIMELINE MODE ---------------------------------------------------------
        if (page==="Timeline") {
            const posts = data.map((entry, index) => {
                if (entry.title) {
                    let eventCSS="col-auto postContent rounded align-self-center"
                    if (entry.future) {
                        eventCSS+= " color-gray"
                    } else {
                        eventCSS+= " color-light"
                    }
                    return (
                        <li className="post row" key={index} >
                            <div className="postTimeline col-3">
                                <h3>{entry.date}</h3>
                                <h5><span className="badge badge-primary">{entry.category}</span></h5>
                                <h3 className="likes"><i className="fas fa-heart mr-2"></i><i className="fas fa-times"> {entry.likes}</i></h3>
                                {/*<button className="btn btn-danger"><i className="fas fa-heart mr-2"></i>+ 1 </button>*/}
                            </div>
                            <div className={eventCSS}>
                                <h3>{entry.private && <i className="fas fa-eye-slash mr-2"></i>}{entry.title}</h3>
                                {entry.location && <h5 className="font-italic ">{entry.location}</h5>}
                                {entry.weight && <p><span className="tagName rounded mr-2">Weight</span>{entry.weight}kg</p>}
                                {entry.vac_name && <p><span className="tagName rounded mr-2">Vaccination</span>{entry.vac_name}</p>}
                                {entry.reason && <p><span className="tagName rounded mr-2">Symptoms</span>{entry.reason}</p>}
                                {entry.medication &&<p><span className="tagName rounded mr-2">Medication</span>{entry.medication}</p>}
                                {entry.description && <p>{entry.description}</p>}
                                {/*photos*/}
                                {entry.photo &&
                                <div className="photos">
                                    <div className="photo m-1 rounded"><img className="rounded" src={process.env.PUBLIC_URL + '/img/' + entry.photo[0]} alt=""/></div>
                                    <div className="photo m-1 rounded"><img className="rounded" src={process.env.PUBLIC_URL + '/img/' + entry.photo[1]} alt=""/></div>
                                    <div className="photo m-1 rounded"><img className="rounded" src={process.env.PUBLIC_URL + '/img/' + entry.photo[2]} alt=""/></div>
                                    <div className="photo m-1 rounded"><img className="rounded" src={process.env.PUBLIC_URL + '/img/' + entry.photo[2]} alt=""/></div>
                                </div>
                                }
                            </div>
                        </li>
                    )
                } else{
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
                <div className="container" id="top">
                    <NewButton currentUser={currentUser} page={page} timelineOwner={timelineOwner}/>

                    {/*display error msg*/}
                    {this.props.error.hasError &&
                    // this is cited from https://getbootstrap.com/docs/4.0/components/alerts/#dismissing
                    <div className="mt-1 alert alert-danger alert-dismissible fade show" role="alert">
                        <h4 className="alert-heading">Oops!</h4>
                        {this.props.error.msg}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>}

                    <ul className="postList">
                        {/*Pet info*/}
                        <div className="row">
                            <div className="col-3 postTimeline">
                                <img src={process.env.PUBLIC_URL + '/img/photo1.png'} width="200" height="200"
                                     className="d-inline-block align-top rounded-circle" alt=""/>

                            </div>
                            <div className="col-9 postContent color-white">
                                <h1 className="">Graylind</h1>
                                <h5>Owner:  {user.username}</h5>
                                <h5>Gender: {user.gender === "male"? <i className="fas fa-mars"></i>:
                                    <i className="fas fa-venus"></i>}</h5>
                                <h5>Breed:  {user.breed}</h5>
                                <h5>Color:  {user.color}</h5>
                                <h5>Birthday:   {user.birthday}</h5>
                            </div>
                        </div>
                        {posts}
                    </ul>
                </div>
            )
        } else

        // DISCOVER MODE ---------------------------------------------------------
        {
            return (
                <div className="container" id="top">
                    <NewButton currentUser={currentUser} page={page} timelineOwner={timelineOwner}/>
                    {/*display error msg*/}
                    {this.props.error.hasError &&
                    // this is cited from https://getbootstrap.com/docs/4.0/components/alerts/#dismissing
                    <div className="mt-1 alert alert-danger alert-dismissible fade show" role="alert">
                        <h4 className="alert-heading">Oops!</h4>
                        {this.props.error.msg}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>}

                    <ul className="postList">
                        {/*Pet info*/}
                        <div className="row">
                            <div className="col-3 postTimeline">
                                <img src={process.env.PUBLIC_URL + '/img/photo1.png'} width="200" height="200"
                                     className="d-inline-block align-top rounded-circle" alt=""/>
                            </div>
                            <div className="col-9 postContent color-white">
                                <h1 className="">Graylind</h1>
                                <h5>Owner:  {user.username}</h5>
                                <h5>Gender: {user.gender === "male"? <i className="fas fa-mars"></i>:
                                    <i className="fas fa-venus"></i>}</h5>
                                <h5>Breed:  {user.breed}</h5>
                                <h5>Color:  {user.color}</h5>
                                <h5>Birthday:   {user.birthday}</h5>
                            </div>
                        </div>
                    </ul>
                </div>
            )

        }
    }
}

export default TimelinePage