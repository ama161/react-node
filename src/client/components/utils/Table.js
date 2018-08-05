import React from 'react';
import { Table as TableANT } from 'antd';

import {getAll} from '../../services/user'

class Table extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data: [],
            columns: []
        }
    }

    componentWillMount(){
        this.setState({
            data: this.props.data,
            columns: this.props.columns
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            data: nextProps.data,
            columns: nextProps.columns
        })
    }

    render(){
        return(
            <TableANT columns={this.state.columns} dataSource={this.state.data}/>
        )
    }
}

export default Table