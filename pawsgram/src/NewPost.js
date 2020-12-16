import React, {Component} from 'react'

class NewPost extends Component {
    state = {
        title: '',
        category: 'photo1.png',
        date:'1',
        description:'',
        private:'',
        photo:'',
        location:'',
        year:'2020',
        month:'1',
    }
// cited from https://www.taniarascia.com/getting-started-with-react/
    handleChange = (event) => {
        const {name, value} = event.target

        this.setState({
            [name]: value,
        })
    }

    render() {
        const {currentUser, page, timelineOwner} = this.props

        return (
            <div className="modal fade" id="newPost" tabIndex="-1" role="dialog"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Post New Event</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" id="newPostBody">
                            {/*form group is modified from https://getbootstrap.com/docs/4.0/components/forms/-->*/}
                            <div className="form-group">
                                <label >Title </label>
                                <input className="form-control" type="text"name="title" value={this.state.title} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label >Category</label>
                                {/*<input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>*/}
                            </div>
                            <div className="form-group">
                                <label >Event Date</label>
                                <div className="row">
                                    <input type="number" min="1970" max="2100" className="ml-3 form-control col-2 mr-2 year" name="year"
                                           value={this.state.year} onChange={this.handleChange}/>
                                    <label className="m-2">/</label>
                                    <input type="number" min="1" max="12"
                                           className="form-control col-2 mr-2 month"  name="month"
                                           value={this.state.month} onChange={this.handleChange}/>
                                    <label className="m-2">/</label>
                                    <input type="number" min="1" max="31" className="form-control col-2 date" name="date"
                                           value={this.state.date} onChange={this.handleChange}/>
                                </div>                            </div>
                            <div className="form-group">
                                <label >Privacy</label>
                                <input className="form-chek-input mr-2" type="radio" name="private" value="false" onChange={this.handleChange}/><label className="form-check-label mr-3">Everyone can see</label>
                                <input className="form-chek-input mr-2" type="radio" name="private" value="true" onChange={this.handleChange}/><label
                                className="form-check-label">Only visible to me</label>
                            </div>
                            <div className="form-group">
                                <label >Location</label>
                                <input className="form-control" type="text" name="location" value={this.state.location} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>Photos</label>
                                <input className="form-control" type="text" name="photo"/>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input className="form-control" type="text" name="description"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" id="newPostSubmit"   data-dismiss="modal" data-target="#newPost" onClick={()=>{this.props.newPost(this.state)}}>Post</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewPost


