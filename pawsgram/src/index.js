import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Nav from './Nav'
import NewButton from "./NewButton";
import TimelinePage from "./TimelinePage";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import NewPost from "./NewPost";

class App extends React.Component {
    state={
        currentUser:{
            logged_in:false,
            user_id:1,
            username: "Zoe",
            pet_name: "Graylind",
            avatar: "photo1.png"
        },
        page: "Timeline",
        timelineOwner: {
            user_id: 1,
        }
    }

    switchToTimeline = () => {
        this.setState({
            page:"Timeline"
        })
    }

    switchToDiscover = () => {
        this.setState({
            page:"Discover"
        })
    }

    getCurrentUser = () => {
        const endpoint = "http://ec2-18-206-208-42.compute-1.amazonaws.com:3000"
        const api="/users/getCurrentUser"
        const url = endpoint+api

        fetch(url, {
            method: 'POST'
        })
            .then((result) => result.json())
            .then((result) => {
                if (result.success) {
                    // success
                    this.setState({
                        currentUser:result,
                    })
                } else {
                    //failed, return {success:false, msg:}
                    return result
                }
            })
    }

    setTimelineOwner = (userID) => {
        this.setState({
            timelineOwner: {
                user_id: userID
            }
        })
    }

    userLogOut = () => {
        const endpoint = "http://ec2-18-206-208-42.compute-1.amazonaws.com:3000"
        const api="/users/logout"
        const url = endpoint+api

        fetch(url, {
            method: 'POST'
        })
            .then((result) => result.json())
            .then((result) => {
                if (result.success) {
                    //logout success
                    this.setState({
                        currentUser:{logged_in:false},
                        page: "Discover"
                    })
                    return result
                } else {
                    //failed, return {success:false, msg:}
                    return result
                }
            })
    }

    userLogIn = (username, password) => {
        const endpoint = "http://ec2-18-206-208-42.compute-1.amazonaws.com:3000"
        const api="/users/login"
        const url = endpoint+api

        fetch(url, {
            method: 'POST',
            body:JSON.stringify({
                username : username,
                password: password
            })
        })
            .then((result) => result.json())
            .then((result) => {
                if (result.success) {
                    //success, fetch current user
                    this.getCurrentUser()
                    return result
                } else {
                    //failed, return {success:false, msg:}
                    return result
                }
            })
    }

    userSignUp = (username, password, info) => {
        const endpoint = "http://ec2-18-206-208-42.compute-1.amazonaws.com:3000"
        const api="/users/signUp"
        const url = endpoint+api

        fetch(url, {
            method: 'POST',
            body:JSON.stringify({
                username : username,
                password: password
            })
        })
            .then((result) => result.json())
            .then((result) => {
                if (result.success) {
                    //success, update info and fetch current user
                    let result = this.userChangeInfo(info)
                    if (result.success) (
                        //success, fetch current user
                        this.getCurrentUser()
                    )
                    return result
                } else {
                    //failed, return {success:false, msg:}
                    return result
                }
            })
    }

    userChangeInfo = (info) => {
        const endpoint = "http://ec2-18-206-208-42.compute-1.amazonaws.com:3000"
        const api="/users/changeInfo"
        const url = endpoint+api

        fetch(url, {
            method: 'POST',
            body:JSON.stringify(info)
        })
            .then((result) => result.json())
            .then((result) => {
                if (result.success) {
                    //success, fetch current user and update timeline owner
                    return result
                } else {
                    //failed, return {success:false, msg:}
                    return result
                }
            })
    }

    componentDidMount() {
        //fetch currentUser
        this.getCurrentUser()
        this.setTimelineOwner(this.state.currentUser.user_id)
    }

    render() {
        const {currentUser, page, timelineOwner} = this.state

        return (
            <div>
            <TimelinePage currentUser={currentUser} page={page} timelineOwner={timelineOwner}/>
            <Nav currentUser={currentUser} page={page}
                 userLogOut={this.userLogOut} userLogIn={this.userLogIn} userSignUp={this.userSignUp}
                setTimelineOwner={this.setTimelineOwner} switchToTimeline={this.switchToTimeline} switchToDiscover={this.switchToDiscover}/>
            <LogIn/>
            <SignUp/>
            <NewPost/>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
// ReactDOM.render(<TimelinePage />, document.getElementById('root'))
// ReactDOM.render(<NewButton />, document.getElementById('newButton'))
// ReactDOM.render(<Nav />, document.getElementById('navbar'))