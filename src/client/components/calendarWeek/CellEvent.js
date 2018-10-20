import React from 'react';

class CellEvent extends React.Component{
    constructor(props){
        super(props);

        this.state={

        }

        
    }

    render(){
        console.log('cellEvent')
        return(
            <div className="customEvent">BOOKED</div>
        )
    }
}
export default CellEvent;