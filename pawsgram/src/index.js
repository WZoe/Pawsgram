import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Nav from './Nav'
import ContentBody from "./ContentBody";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

class App extends React.Component {
    state = {
        currentUser: {
            logged_in: false,
            // user_id:1,
            // username: "Zoe",
            // pet_name: "Graylind",
            // avatar: "photo1.png"
        },
        page: "Discover",
        error: {
            hasError: false,
            msg: ''
        },
        posts: {
            user: {},
            data: []
        }
    }

    updateError = (result) => {
        if (!result.success) {
            this.setState({
                error: {
                    hasError: true,
                    msg: result.msg
                }
            })
        } else {
            this.setState({
                error: {
                    hasError: false,
                    msg: ''
                }
            })
        }
    }

    switchToTimeline = () => {
        this.setState({
            page: "Timeline"
        })
    }

    switchToDiscover = () => {
        this.setState({
            page: "Discover"
        })
    }

    getCurrentUser = () => {
        const endpoint = "http://ec2-18-206-208-42.compute-1.amazonaws.com:3000"
        const api = "/users/getCurrentUser"
        const url = endpoint + api

        console.log(localStorage.getItem("current_user_id"))
        if (localStorage.getItem("current_user_id") !== null) {
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({
                    current_user_id: localStorage.getItem("current_user_id")
                })
            })
                .then((result) => result.json())
                .then((result) => {
                    // this.updateError(result)
                    console.log(result)
                    this.setState({
                        currentUser: result,
                    })
                    if (!this.state.timelineOwner) {
                        this.setTimelineOwner(localStorage.getItem("current_user_id"))
                    }
                    return result
                })
        } else {
            this.setState({
                currentUser: {logged_in: false}
            })
            console.log("not logged in")
        }


    }

    setTimelineOwner = (userID, change) => {
        console.log("setting owner to " + userID)
        this.setState({
            timelineOwner: {
                user_id: userID
            }
        })
        this.fetchTimeline(userID, change)
    }

    userLogOut = () => {
        localStorage.removeItem("current_user_id")
        this.setState({
            currentUser: {logged_in: false},
            page: "Discover"
        })
        //
        // const endpoint = "http://ec2-18-206-208-42.compute-1.amazonaws.com:3000"
        // const api="/users/logout"
        // const url = endpoint+api
        //
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body : {
        //         current_user_id: localStorage.getItem("current_user_id")
        //     },
        //     credentials: 'include',
        // })
        //     .then((result) => result.json())
        //     .then((result) => {
        //         if (result.success) {
        //             //logout success
        //             this.setState({
        //                 currentUser:{logged_in:false},
        //                 page: "Discover"
        //             })
        //             return result
        //         } else {
        //             //failed, return {success:false, msg:}
        //             return result
        //         }
        //     })
    }

    userLogIn = (username, password) => {
        const endpoint = "http://ec2-18-206-208-42.compute-1.amazonaws.com:3000"
        const api = "/users/login"
        const url = endpoint + api

        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then((result) => result.json())
            .then((result) => {
                this.updateError(result)
                console.log(result)
                if (result.success) {
                    //success, fetch current user
                    localStorage.setItem("current_user_id", result.current_user_id)
                    this.getCurrentUser()
                }
            })
    }

    userSignUp = (info) => {
        const endpoint = "http://ec2-18-206-208-42.compute-1.amazonaws.com:3000"
        const api = "/users/signUp"
        const url = endpoint + api

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                username: info.username,
                password: info.password
            })
        })
            .then((result) => result.json())
            .then((result) => {
                    this.updateError(result)
                    if (result.success) {
                        //success, update info and fetch current user
                        console.log(result)
                        localStorage.setItem("current_user_id", result.current_user_id)
                        this.userChangeInfo(info)
                    }
                }
            )
    }

    userChangeInfo = (info) => {
        const endpoint = "http://ec2-18-206-208-42.compute-1.amazonaws.com:3000"
        const api = "/users/changeInfo"
        const url = endpoint + api

        info['birthday'] = info.year + '/' + info.month + '/' + info.date
        info["current_user_id"] = localStorage.getItem("current_user_id")

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(info)
        })
            .then((result) => result.json())
            .then((result) => {
                this.updateError(result)
                if (result.success) {
                    //success, change info
                    this.getCurrentUser()
                    return result
                } else {
                    //failed, return {success:false, msg:}
                    return result
                }
            })
    }

    fetchTimeline = (user_id, change) => {
        const endpoint = "http://ec2-18-206-208-42.compute-1.amazonaws.com:3000"
        const api = "/events/timeline"
        const url = endpoint + api

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                current_user_id: localStorage.getItem("current_user_id"),
                user_id: user_id
            })
        })
            .then((result) => result.json())
            .then((result) => {
                this.updateError(result)
                if (result.success) {
                    //success, update timeline
                    console.log(result)
                    this.setState({
                        posts: {
                            user: result.user,
                            data: result.data
                        }
                    })
                    if (change) {
                        this.switchToTimeline()
                    }
                    return result
                } else {
                    //failed, return {success:false, msg:}
                    return result
                }
            })
    }

    likePlus = (index) => {
        let newData = this.state.posts.data
        newData[index].likes += 1
        this.setState({
            posts: {
                data: newData
            }
        })
    }

    componentDidMount() {
        //fetch currentUser
        this.getCurrentUser()
        // this.setTimelineOwner(this.state.currentUser.user_id)
    }

    render() {
        const {currentUser, page, timelineOwner, error} = this.state

        return (
            <div>
                <ContentBody likePlus={this.likePlus} fetchTimeline={this.fetchTimeline} posts={this.state.posts}
                             currentUser={currentUser} page={page} timelineOwner={timelineOwner} error={error}
                             updateError={this.updateError} setTimelineOwner={this.setTimelineOwner}
                             switchToTimeline={this.switchToTimeline}/>
                <Nav currentUser={currentUser} page={page}
                     userLogOut={this.userLogOut} setTimelineOwner={this.setTimelineOwner}
                     switchToTimeline={this.switchToTimeline} switchToDiscover={this.switchToDiscover}/>
                <LogIn userLogIn={this.userLogIn}/>
                <SignUp userSignUp={this.userSignUp}/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))
// ReactDOM.render(<TimelinePage />, document.getElementById('root'))
// ReactDOM.render(<NewButton />, document.getElementById('newButton'))
// ReactDOM.render(<Nav />, document.getElementById('navbar'))