import React from 'react'

class AvatarsContent extends React.Component{
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            avatarSelected: ''
        }
    }

    handleClick(avatar){
        let oldavatar = this.state.avatarSelected;
        if(oldavatar !== ''){
            document.getElementsByClassName(oldavatar)[0].className = oldavatar + " icon";
        }
        this.setState({avatarSelected: avatar})
        document.getElementsByClassName(avatar)[0].className = avatar + " icon icon-selected";
        this.props.onHandleClick(avatar);
    }

    render(){
        return(
            <div className="animals-content">
                <p className="icon icon-avatar-1" onClick={() => this.handleClick("icon-avatar-1")}></p>
                <p className="icon icon-avatar-2" onClick={() => this.handleClick("icon-avatar-2")}></p>
                <p className="icon icon-avatar-3" onClick={() => this.handleClick("icon-avatar-3")}></p>
                <p className="icon icon-avatar-4" onClick={() => this.handleClick("icon-avatar-4")}></p>
                <p className="icon icon-avatar-5" onClick={() => this.handleClick("icon-avatar-5")}></p>
                <p className="icon icon-avatar-6" onClick={() => this.handleClick("icon-avatar-6")}></p>
                <p className="icon icon-avatar-7" onClick={() => this.handleClick("icon-avatar-7")}></p>
                <p className="icon icon-avatar-8" onClick={() => this.handleClick("icon-avatar-8")}></p>
                <p className="icon icon-avatar-9" onClick={() => this.handleClick("icon-avatar-9")}></p>
                <p className="icon icon-avatar-10" onClick={() => this.handleClick("icon-avatar-10")}></p>
                <p className="icon icon-avatar-11" onClick={() => this.handleClick("icon-avatar-11")}></p>
                <p className="icon icon-avatar-12" onClick={() => this.handleClick("icon-avatar-12")}></p>
                <p className="icon icon-avatar-13" onClick={() => this.handleClick("icon-avatar-13")}></p>
                <p className="icon icon-avatar-14" onClick={() => this.handleClick("icon-avatar-14")}></p>
            </div>
        )
    }
}

export default AvatarsContent