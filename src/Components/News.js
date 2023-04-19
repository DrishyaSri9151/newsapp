import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

    constructor(){
        super();
        console.log("hello i am a constructor from news component");
        this.state={
            articles: [],
            loading: false,
            page:1
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4c9fa14a51574076ae514d4c4d75f734&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles ,  
            totalResults : parsedData.totalResults,
            loading:false
        })
    }

    handlePrevClick = async () => {
        console.log("previous");
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4c9fa14a51574076ae514d4c4d75f734&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.setState({loading:true})
        let parsedData = await data.json();
        this.setState({
            page : this.state.page-1,
            articles: parsedData.articles,
            loading:false
        })
    }
    handleNextClick = async () => {
        console.log("Next");
        if(!(this.state.page+1 > (Math.ceil(this.state.totalResults/this.props.pageSize)))){
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4c9fa14a51574076ae514d4c4d75f734&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page : this.state.page+1,
            articles: parsedData.articles,
            loading:false
        })
    }
    }



  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center"> NewsEra - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
               return <div className="col-md-4" key={element.url}>
               <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage?element.urlToImage:"https://w7.pngwing.com/pngs/982/544/png-transparent-news-graphy-logo-icon-news-logo-text-photography-computer-wallpaper.png "} newsUrl={element.url}/>
               </div>
            })}
        </div>
        <div className="container d-flex justify-content-between" >
        <button disabled={this.state.page <=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous {this.state.page-1}</button>
        <button disabled={this.state.page+1 > (Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; {this.state.page}</button>
        </div>
      </div>
    )
  }
}

export default News