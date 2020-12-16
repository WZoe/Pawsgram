import React, {Component} from 'react'
import NewButton from "./NewButton";

class DiscoverPage extends Component {
    state = {

    }

    fetchDiscover =() => {

    }

    componentDidMount() {
        this.fetchDiscover()

    }

    render() {
        const {currentUser, page, timelineOwner} = this.props

        return(
            <div>
                <NewButton currentUser={currentUser} page={page} timelineOwner={timelineOwner}/>

            </div>
        )

    }
}

export default DiscoverPage