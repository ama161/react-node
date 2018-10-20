import React from 'react';
import Input from '../utils/Input';

class CellModal extends React.Component{
    constructor(props){
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.state={
            label: '',
        }
    }

    handleRemove(){
      this.props.onRemove();
    }
  
    handleSave(){
      const label = this.state.label;
      
      console.log(label)
      this.props.onSave({
        label,
      });
    }

    render(){
        const lan = this.state.language;

        return(
          <div className="customModal">
          {/* <div className="customModal__text">Subject DAAAY</div> */}
          {/* <input
            ref={el => this.label = el}
            className="customModal__input"
            type="text"
            placeholder="Subject"
            defaultValue={label}
          /> */}
          <Input
            className="form-item"
            value={this.state.label}
            type="text" 
            label="Subject" 
            onChange={(event) => this.setState({label: event.target.value})}
            />
          <button className="customModal__button customModal__button_example" onClick={this.handleSave}>Save</button>
        </div>
        )
    }
}

export default CellModal