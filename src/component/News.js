import React from "react";
import Newsitem from "./NewsItem";
import Loading from "./Loading";

export default class News extends React.Component {
    articals = []
    constructor() {
        super()
        // let [articals]=useState()
        this.state = {

            articals: this.articals,
            page:1,
            loading:false
            
        }



    }

async componentDidMount(){
    
    let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9b1b6243a94048f1a4ecb428c19c2423&pageSize=20"
    this.setState({loading:true})
    let data = await fetch(url)
    let parsdata = await data.json()
    this.setState({articals: parsdata.articles,totalResults:parsdata.totalResults,loading:false})
    console.log(parsdata)
}

Privious= async()=>{
    
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9b1b6243a94048f1a4ecb428c19c2423&page=${this.state.page - 1}pageSize=20`;
    let data = await fetch(url)
    let parsdata = await data.json()
    
    console.log(parsdata)
    this.setState({
        page:this.state.page -1,
        articals: parsdata.articles,
        

    })
    console.log(this.articals)


}
Next= async()=>{
    console.log(Math.ceil(this.state.totalResults/20))
    if(this.state.page+1>Math.ceil(this.state.totalResults/20)){

    }
    else{

    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9b1b6243a94048f1a4ecb428c19c2423&page=${this.state.page + 1}&pageSize=20`;
    this.setState({loading:true})
    let data = await fetch(url)
    let parsdata = await data.json()
    console.log(parsdata)
    
    
    this.setState({
        page:this.state.page +1,
        articals: parsdata.articles,
        loading:false
        

    })

    }
    
    
 
    
}
 render() {
        return (
            

            <div>
                {this.state.loading && <Loading />}
                


                <div className="container my-3">
                    <h1 className="text-center">News Page</h1>
                    <div className="row ">
                        {!this.state.loading && this.state.articals.map((element) => {
                            return <div className="col-md-3" >
                                <Newsitem title={element.title?element.title.slice(0 , 45):""} description={element.description?element.description.slice(0,88):""}  imageurl={element.urlToImage?element.urlToImage:""} newsurl={element.url?element.url:""} />

                            </div>
                        })}

                        <div className="d-flex justify-content-between">
                        <button disabled={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.Privious}>Privious </button>
                        <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/20)}type="button" class="btn btn-dark" onClick={this.Next}>Next</button>
                        </div>



                    </div>




                </div>
            </div>

        )
    }
}