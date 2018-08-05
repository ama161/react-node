import React from 'react';
import { Select as SelectANT } from 'antd';

const Option = SelectANT.Option;

class Select extends React.Component{
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.state = {
            options: {}
        }
    }

    handleChange(value) {
        this.props.onHandleChange(value);
    }

    componentWillReceiveProps(nextProps){
        this.setState({options: nextProps.options})
    }

    render(){
        return(
            <SelectANT
                showSearch
                style={{ width: 200 }}
                placeholder={this.props.placeholder}
                optionFilterProp="children"
                onChange={this.handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {Object.values(this.state.options).map((key, index) => 
                    <Option value={key[this.props.id]}>{key[this.props.name]}</Option>
                )}
            </SelectANT>
        )
    }
}

export default Select;