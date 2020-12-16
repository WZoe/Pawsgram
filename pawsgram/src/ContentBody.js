import React, {Component} from 'react'
import TimelinePage from "./TimelinePage";
import DiscoverPage from "./DiscoverPage";

class ContentBody extends Component {

    render() {
        const {currentUser, page, timelineOwner} = this.props
        // 后端传数据来的时候在today哪里加一个事件
        return (
            <div className="container" id="top">

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
                {page === "Timeline" &&
                <TimelinePage likePlus={this.props.likePlus} fetchTimeline={this.props.fetchTimeline}
                              posts={this.props.posts} updateError={this.props.updateError} currentUser={currentUser}
                              timelineOwner={timelineOwner} page={page} setTimelineOwner={this.props.setTimelineOwner}/>
                }
                {page === "Discover" &&
                <DiscoverPage currentUser={currentUser} timelineOwner={timelineOwner} page={page}
                              switchToTimeline={this.props.switchToTimeline}
                              setTimelineOwner={this.props.setTimelineOwner}/>}
            </div>
        )
    }
}

export default ContentBody