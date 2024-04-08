import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
   let {title, description, imageUrl, newsUrl,author,date} = this.props;
    return (
      <div>
        <div className="card">
          <img src={imageUrl?imageUrl:"https://static.vecteezy.com/system/resources/thumbnails/006/299/370/small/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg"} className="card-img-top" alt="A news photo"/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-muted">By {!author? "Unknown" : author} on {date}</small></p>
              <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
