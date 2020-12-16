// reference of react: https://www.taniarascia.com/getting-started-with-react/
// reference of react: https://reactjs.org/docs/thinking-in-react.html
// reference of bootstrap: https://getbootstrap.com/docs/4.0

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
        },
        forYou: {
            data:[]
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

        // console.log(localStorage.getItem("current_user_id"))
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
                    // console.log(result)
                    this.setState({
                        currentUser: result,
                    })

                    this.setTimelineOwner(localStorage.getItem("current_user_id"),true)
                    this.fetchDiscover()

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
        })
        this.fetchTimeline(this.state.timelineOwner.user_id, false)
        this.fetchDiscover()
        this.setState({
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
                // console.log(result)
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
        const upload = endpoint+'/events/upload'

        //process photo
        let ori_photo = info.avatar
        // console.log(ori_photo)
        const fd = new FormData()
        fd.append("file", ori_photo)

        // upload img using api
        // uploading module cited from https://programmingwithmosh.com/javascript/react-file-upload-proper-server-side-nodejs-easy/
        fetch(upload, {
            body: fd,
            method:"POST",
        })
            .then((result) => result.json())
            .then((result) => {
                    this.updateError(result)
                    if (result.success) {
                        //success,
                        const filename=result.filenames[0]
                        info.avatar = filename
                        if (filename == null) {
                            info.avatar="avatar.png"
                        }
                        // console.log(result)

                        //sign up
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
                                        // console.log(result)
                                        localStorage.setItem("current_user_id", result.current_user_id)
                                        this.userChangeInfo(info)
                                    }
                                }
                            )
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
                    // console.log(result)
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

    likePlus = (index, page) => {
        if (page==="Timeline") {
            let newPosts = this.state.posts
            newPosts.data[index].likes += 1
            this.setState({
                posts: newPosts
            })
        } else {
            let newData = this.state.forYou.data
            newData[index].event.likes += 1
            this.setState({
                forYou:{
                    data: newData
                }
            })
        }
    }

    fetchDiscover = () => {
        const endpoint = "http://ec2-18-206-208-42.compute-1.amazonaws.com:3000"
        const api = "/events/forYou"
        const url = endpoint + api

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                current_user_id: localStorage.getItem("current_user_id"),
            })
        })
            .then((result) => result.json())
            .then((result) => {
                if (result.success) {
                    //success, update timeline
                    console.log(result.data)
                    this.setState({
                        forYou:{
                            data: result.data
                        }
                    })
                    return result
                } else {
                    //failed, return {success:false, msg:}
                    return result
                }
            })
    }

    componentDidMount() {
        //fetch currentUser
        // localStorage.clear()
        this.getCurrentUser()
        // this.setTimelineOwner(this.state.currentUser.user_id)
    }

    render() {
        const {currentUser, page, timelineOwner, error} = this.state

        return (
            <div>
                <ContentBody forYou={this.state.forYou} likePlus={this.likePlus} fetchTimeline={this.fetchTimeline} fetchDiscover={this.fetchDiscover} posts={this.state.posts}
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
