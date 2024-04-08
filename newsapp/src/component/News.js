import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    }
    document.title = this.props.category;
  }
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c507ee2d9d754a708f85c35d7fa27b8e&page=${this.state.page}&pageSize=12`;

    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
  }
  async componentDidMount() {
    //    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c507ee2d9d754a708f85c35d7fa27b8e&page=1&pageSize=12`;

    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({ articles: parsedData.articles,
    //   totalResults: parsedData.totalResults, 
    //   loading:false
    // })
    this.updateNews()
  }

  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c507ee2d9d754a708f85c35d7fa27b8e&page=${this.state.page - 1}&pageSize=12`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({ articles: parsedData.articles })
    // this.setState({
    //   page: this.state.page - 1,
    //   loading:false

    // })
    this.setState({ page: this.state.page - 1 })
    this.updateNews()
  }

  handleNextClick = async () => {
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / 12))) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c507ee2d9d754a708f85c35d7fa27b8e&page=${this.state.page + 1}&pageSize=12`;
    //   this.setState({loading:true})
    //   let data = await fetch(url);
    //   let parsedData = await data.json()
    //   this.setState({ articles: parsedData.articles })
    //   this.setState({
    //     page: this.state.page + 1,
    //     loading:false
    //   })
    // }
    this.setState({ page: this.state.page + 1 })
    this.updateNews()
  }

  fetchMoreData = async () => {
 this.setState({page:this.state.page+1})
 const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c507ee2d9d754a708f85c35d7fa27b8e&page=${this.state.page}&pageSize=12`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    })

  };

  render() {
    return (
      < >
        <h1 className='text-center'>InfoNow</h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
          // inverse={true} //
          hasMore={this.state.articles.length!== this.state.totalResults}
          // loader={<Spinner/>}
        // scrollableTarget="scrollableDiv"
        >
          <div className="container">
          <div className="row ">
            {this.state.articles.map((element) => {
              return <div className="col-md-3 mt-3" key={element.url}>
                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
        
        {/* <div className="container d-flex justify-content-between mt-3">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 12)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News
