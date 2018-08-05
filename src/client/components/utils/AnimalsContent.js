import React from 'react'

class AnimalsContent extends React.Component{
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            iconSelected: ''
        }
    }

    handleClick(icon){
        let oldIcon = this.state.iconSelected;
        if(oldIcon !== ''){
            document.getElementById(oldIcon).className = "icon " + oldIcon;            
            // document.getElementsByClassName(oldIcon)[0].className = "icon " + oldIcon;
        }
        this.setState({iconSelected: icon})
        document.getElementById(icon).className = icon + " icon icon-selected";        
        // document.getElementsByClassName(icon)[0].className = icon + " icon icon-selected";
        this.props.onHandleClick(icon);
    }

    render(){
        return(
            <div className="animals-content">
                <p className="icon icon-dog" id="icon-dog" onClick={() => this.handleClick("icon-dog")}></p>
                <p className="icon icon-cat" id="icon-cat" onClick={() => this.handleClick("icon-cat")}></p>
                <p className="icon icon-bee" id="icon-bee" onClick={() => this.handleClick("icon-bee")}></p>
                <p className="icon icon-owl" id="icon-owl" onClick={() => this.handleClick("icon-owl")}></p>
                <p className="icon icon-cow" id="icon-cow" onClick={() => this.handleClick("icon-cow")}></p>
                <p className="icon icon-bat" id="icon-bat" onClick={() => this.handleClick("icon-bat")}></p>
                <p className="icon icon-crab" id="icon-crab" onClick={() => this.handleClick("icon-crab")}></p>
                <p className="icon icon-elephant" id="icon-elephant" onClick={() => this.handleClick("icon-elephant")}></p>
                <p className="icon icon-fish" id="icon-fish" onClick={() => this.handleClick("icon-fish")}></p>
                <p className="icon icon-pig" id="icon-pig" onClick={() => this.handleClick("icon-pig")}></p>
                <p className="icon icon-tiger" id="icon-tiger" onClick={() => this.handleClick("icon-tiger")}></p>
                <p className="icon icon-toucan" id="icon-toucan" onClick={() => this.handleClick("icon-toucan")}></p>
            </div>
        )
    }
}

export default AnimalsContent