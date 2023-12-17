import React from "react"
import Loading from './loading.gif'
export default class loading extends React.Component{
render(){
    return(
        <div className="text-center">
            <img  src={Loading} alt="Loading" />

        </div>
    )
}
}