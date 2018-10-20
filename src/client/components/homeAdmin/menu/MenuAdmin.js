import React from 'react';
import { withRouter } from 'react-router'
import { Menu as MenuANT, Icon, message as Message} from 'antd';
import Language from '../../utils/Language';
import language from '../../../language/language'
import {logout} from '../../../functions/logout'

const MenuItem = MenuANT.Item;
const MenuItemGroup = MenuANT.ItemGroup;
const SubMenu = MenuANT.SubMenu;

class MenuAdmin extends React.Component {
    constructor(props){
        super(props);

        this.onHandleLogout = this.onHandleLogout.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
        this.state = {
            language: ''
        }
    }

    componentWillMount(){
        this.props.onHandleClass();
        this.setState({language: sessionStorage.language})
    }

    handleClick(e){
        if(e.key === '1')  this.props.onHandleModalStudent();  
        if(e.key === '2')  this.props.onHandleModalTeacher();  
        if(e.key === '3')  this.props.onHandleModalParent();  
        if(e.key === '4')  this.props.onHandleStudents();    
        if(e.key === '5')  this.props.onHandleTeachers();    
        if(e.key === '6')  this.props.onHandleParents();    
        if(e.key === '7')  this.props.onHandleModalClass();          
        if(e.key === '8')  this.props.onHandleClass();  
        if(e.key === '9')  this.props.onHandleModalSubject();  
        if(e.key === '10')  this.props.onHandleSubject();  
        // if(e.key === '11')  this.props.onHandleNewCalendarWeek();  
        // if(e.key === '12')  this.props.onHandleCalendarWeek();  
        if(e.key === '13')  this.onHandleLogout();  
    }

    onHandleLogout(){
        logout();
        this.props.history.push('/');
    }

    render() {
        const lan = (this.state.language) ? this.state.language : 0;
        return (
            <MenuANT
                onClick={this.handleClick}
                style={{ width: 256, height: '100vh' }}
                defaultSelectedKeys={['8']}
                defaultOpenKeys={['sub3']}
                mode="inline"
            >
                <MenuItemGroup 
                    key="g1" 
                    title={<span className="container-logo"><p className="icon logo-header"></p></span>}
                >
                    <Language 
                        changeLanguage={(language) => {
                            this.setState({language: sessionStorage.language});
                            this.props.onChangeLanguage(language);
                        }}/>
                    <SubMenu key="sub1" title={<span><Icon type="team" /><span>{language[lan].users}</span></span>}>
                        <MenuItem key="1"><Icon type="user-add" />{language[lan].addStudents}</MenuItem>        
                        <MenuItem key="2"><Icon type="user-add" />{language[lan].addTeachers}</MenuItem>        
                        <MenuItem key="3"><Icon type="user-add" />{language[lan].addParents}</MenuItem> 
                        <SubMenu key="sub2" title={<span><Icon type="team" /><span>{language[lan].viewUsers}</span></span>}>
                            <MenuItem key="4"><Icon type="user" />{language[lan].student}</MenuItem>        
                            <MenuItem key="5"><Icon type="user" />{language[lan].teacher}</MenuItem>        
                            <MenuItem key="6"><Icon type="user" />{language[lan].parent}</MenuItem>        
                        </SubMenu> 
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><Icon type="folder-open" /><span>{language[lan].class}</span></span>}>
                        <MenuItem key="7"><Icon type="folder-add" />{language[lan].addClass}</MenuItem>        
                        <MenuItem key="8"><Icon type="folder" />{language[lan].viewClass}</MenuItem>        
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><Icon type="folder-open" /><span>{language[lan].subjects}</span></span>}>
                        <MenuItem key="9"><Icon type="folder-add" />{language[lan].addSubjects}</MenuItem>        
                        <MenuItem key="10"><Icon type="folder" />{language[lan].viewSubjects}</MenuItem>        
                    </SubMenu>
                    {/* <SubMenu key="sub5" title={<span><Icon type="folder-open" /><span>{language[lan].calendarWeek}</span></span>}>
                        <MenuItem key="11"><Icon type="folder-add" />{language[lan].addCalendarWeek}</MenuItem>        
                        <MenuItem key="12"><Icon type="folder" />{language[lan].viewCalendarWeek}</MenuItem>        
                    </SubMenu> */}
                    <MenuItem key="13"><Icon type="logout" />{language[lan].logout}</MenuItem>   
                </MenuItemGroup>
            </MenuANT>
        );
    }
}

export default withRouter(MenuAdmin);