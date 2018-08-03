import React from 'react';
import { Select as SelectANT } from 'antd';

const Option = SelectANT.Option;

class Select extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            options: {}
        }
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }
      
    // handleBlur() {
    //     console.log('blur');
    // }
      
    // handleFocus() {
    //     console.log('focus');
    // }

    componentWillMount(){
        //getOptions
    }

    componentWillReceiveProps(nextProps){
        //getOptions
    }

    render(){
        return(
            <SelectANT
                showSearch
                style={{ width: 200 }}
                placeholder={this.props.placeholder}
                optionFilterProp="children"
                onChange={this.handleChange}
                // onFocus={this.handleFocus}
                // onBlur={this.handleBlur}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option value="jack">Jack</Option>
            </SelectANT>
        )
    }
}

export default Select;