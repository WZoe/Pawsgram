import React, {Component} from 'react'

class NewPost extends Component {
    state = {
        temp:'',
        title: '',
        category: 'General',
        date: '1',
        description: '',
        private: '',
        photo: [],
        location: '',
        year: '2020',
        month: '1',
        weight: '',
        vac_name: "",
        reason: '',
        medication: ''
    }
// cited from https://www.taniarascia.com/getting-started-with-react/
    handleChange = (event) => {
        const {name, value} = event.target

        this.setState({
            [name]: value,
        })
    }
    handleUpload = (event) => {
        const file = event.target.files[0]

        this.setState(
            {
                temp: file
            }
        )
    }

    componentDidMount() {
        // update current date
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        this.setState({
            date: date,
            month: month,
            year: year
        })
    }

    render() {
        const {currentUser, page, timelineOwner} = this.props
        const thumbnails = this.state.photo.map((photo, index) => {
            return (
                // <div className="thumbnail  m-1 rounded">
                <p>{photo.name}</p>
        // </div>
            )
        })

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
                                <label>Title </label>
                                <input className="form-control" type="text" name="title" value={this.state.title}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select className="form-control" name="category" value={this.state.category}
                                        onChange={this.handleChange}>
                                    <option value="General">General</option>
                                    <option value="Activity">Activity</option>
                                    <option value="Memorial">Memorial</option>
                                    <option value="Weight Tracking">Weight Tracking</option>
                                    <option value="Vaccination">Vaccination</option>
                                    <option value="Vet Visit">Vet Visit</option>
                                </select>
                                {/*<input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>*/}
                            </div>
                            <div className="form-group">
                                <label>Event Date</label>
                                <div className="row">
                                    <input type="number" min="1970" max="2100"
                                           className="ml-3 form-control col-2 mr-2 year" name="year"
                                           value={this.state.year} onChange={this.handleChange}/>
                                    <label className="m-2">/</label>
                                    <input type="number" min="1" max="12"
                                           className="form-control col-2 mr-2 month" name="month"
                                           value={this.state.month} onChange={this.handleChange}/>
                                    <label className="m-2">/</label>
                                    <input type="number" min="1" max="31" className="form-control col-2 date"
                                           name="date"
                                           value={this.state.date} onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input className="form-control" type="text" name="location" value={this.state.location}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label className="mr-4">Privacy</label>
                                <input className="form-chek-input mr-2" type="radio" name="private" value="false"
                                       onChange={this.handleChange}/><label className="form-check-label mr-3">Everyone
                                can see</label>
                                <input className="form-chek-input mr-2" type="radio" name="private" value="true"
                                       onChange={this.handleChange}/><label
                                className="form-check-label">Only visible to me</label>
                            </div>
                            {this.state.category === "Weight Tracking" &&
                            <div className="form-group">
                                <label>Weight</label>
                                <div className="input-group">
                                    <input className="form-control" type="text" name="weight" value={this.state.weight}
                                           onChange={this.handleChange}/>
                                    <div className="input-group-append"><span className="input-group-text">kg</span>
                                    </div>
                                </div>
                            </div>
                            }
                            {this.state.category === "Vaccination" &&
                            <div className="form-group">
                                <label>Vaccine Name</label>

                                <input className="form-control" type="text" name="vac_name" value={this.state.vac_name}
                                       onChange={this.handleChange}/>

                            </div>
                            }
                            {this.state.category === "Vet Visit" &&
                            <div>
                                <div className="form-group">
                                    <label>Symptoms</label>
                                    <input className="form-control" type="text" name="reason" value={this.state.reason}
                                           onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Medication</label>
                                    <textarea className="form-control" name="medication" value={this.state.medication}
                                              onChange={this.handleChange}/>
                                </div>
                            </div>
                            }
                            <div className="form-group">
                                <label>Photos</label>
                                <div className="input-group">
                                <input className="form-control" type="file" name="temp" onChange={this.handleUpload}/>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" onClick={()=>{
                                        if (this.state.temp) {
                                            let newphoto = this.state.photo
                                            newphoto.push(this.state.temp)
                                            // console.log(newphoto)
                                            this.setState({
                                                photo:newphoto,
                                                temp:''
                                            })
                                        }
                                    }} type="button">Add</button>
                                </div>
                                </div>
                                <div className="m-2">
                                    {thumbnails}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea rows="5" className="form-control" name="description"
                                          value={this.state.description} onChange={this.handleChange}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" id="newPostSubmit" data-dismiss="modal"
                                    data-target="#newPost" onClick={() => {
                                this.props.newPost(this.state)
                            }}>Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewPost


