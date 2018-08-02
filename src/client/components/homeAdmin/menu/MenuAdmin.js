import React from 'react';
import { withRouter } from 'react-router'
import { Menu as MenuANT, Icon, message as Message} from 'antd';

const MenuItem = MenuANT.Item;
const MenuItemGroup = MenuANT.ItemGroup;
const SubMenu = MenuANT.SubMenu;

class MenuAdmin extends React.Component {
    constructor(props){
        super(props);

        this.onHandleLogout = this.onHandleLogout.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
        this.state = {

        }
    }

    handleClick(e){
        if(e.key === '1')  this.props.onHandleModalStudent();  
        if(e.key === '2')  this.props.onHandleModalTeacher();  
        if(e.key === '3')  this.props.onHandleModalParent();  
        if(e.key === '4')  console.log('users');  
        if(e.key === '5')  this.props.onHandleModalClass();          
        if(e.key === '6')  this.props.onHandleClass();  
        if(e.key === '7')  this.onHandleLogout();  
    }

    onHandleLogout(){
        console.log('logout');
    }

    render() {
        return (
            <MenuANT
                onClick={this.handleClick}
                style={{ width: 256, height: '100vh' }}
                defaultSelectedKeys={['4']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <MenuItemGroup 
                    key="g1" 
                    title={<span className="container-logo"><span className="logo"></span><h1>TFG</h1></span>}
                >
                    <SubMenu key="sub1" title={<span><Icon type="team" /><span>Users</span></span>}>
                        <MenuItem key="1"><Icon type="user-add" /> New Student</MenuItem>        
                        <MenuItem key="2"><Icon type="user-add" /> New Teacher</MenuItem>        
                        <MenuItem key="3"><Icon type="user-add" /> New Parent</MenuItem>        
                        <MenuItem key="4"><Icon type="solution" /> View Users</MenuItem>        
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="folder-open" /><span>Class</span></span>}>
                        <MenuItem key="5"><Icon type="folder-add" /> New Class</MenuItem>        
                        <MenuItem key="6"><Icon type="folder" /> View Class</MenuItem>        
                    </SubMenu>
                    <MenuItem key="7"><Icon type="logout" /> Logout</MenuItem>   
                </MenuItemGroup>
            </MenuANT>
        );
    }
}

export default withRouter(MenuAdmin);