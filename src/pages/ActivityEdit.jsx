import React, { Component } from 'react'
import { connect } from 'react-redux'


import { activityService } from '../services/activityService.js'
import { uploadImg } from '../services/imgUploadService.js'
import { saveActivity } from '../store/actions/activityActions.js'



class _ActivityEdit extends Component {

    state = {
        activity: {},
        isEdit: true,
        isUploading: false
    }

    componentDidMount() {
        this.loadActivity()
    }

    loadActivity() {
        const activityId = this.props.match.params.activityId;
        if (activityId) {
            activityService.getById(activityId)
                .then(activity => {
                    console.log('activity', activity);
                    this.setState({ activity })
                })
        } else {
            const activity = activityService.getEmpty();
            this.setState({ activity });
        }
    }

    onSaveActivity = async (ev) => {
        ev.preventDefault();
        const activity = this.state.activity
        await this.props.saveActivity(activity);
        this.props.history.push('/activity');
    }

    handleSchedule = () => { }

    handleInput = ({ target }) => {
        this.setState(
            { activity: { ...this.state.activity, [target.name]: target.value } }
        )
    }

    // todo: change to imgUrls array
    uploadFile = async (ev) => {
        this.setState({ isUploading: true })
        const imgObj = await uploadImg(ev)
        this.setState({ isUploading: false })
        this.setState({ activity: { ...this.state.activity, imgUrls: imgObj.url } })

    }

    render() {
        const { activity } = this.state;
        console.log('activity', activity);
        if (!Object.keys(activity).length) return <h1>Loading...</h1>
        var imgArr = activity.imgUrls;
        console.log('imgarr-', imgArr);
        return (

            <div>
                <div>{activity.imgUrls.map((img, idx) => <img className={`img-edit img-${idx}`} key={idx} src={img} />)}</div>

                <form onSubmit={this.onSaveActivity} >
                    <label htmlFor="title"> {`${this.state.isEdit ? ' edit' : ''} title:`}</label>
                    <input type="text" value={activity.title}
                        name="title"
                        onChange={this.handleInput}
                    />
                    <label htmlFor="description" > {`${this.state.isEdit ? ' edit' : ''} description:`}</label>
                    <textarea name="description" cols="30" rows="10" value={activity.description} onChange={this.handleInput}></textarea>

                    <label htmlFor="price"> {`${this.state.isEdit ? ' edit' : ''} price:`}</label>
                    <input type="text" value={activity.price}
                        name="price"
                        onChange={this.handleInput}
                    />



                    {/* multiple */}
                    <input type="file" onChange={this.uploadFile} />
                    <button disabled={this.state.isUploading} >Save</button>

                </form>
            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = {
    saveActivity
}

export const ActivityEdit = connect(mapStateToProps, mapDispatchToProps)(_ActivityEdit)