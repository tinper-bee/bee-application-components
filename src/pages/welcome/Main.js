import React,{Component} from 'react'
import NavLink from '../../components/NavLink';

class MainPage extends Component{
 render() {
   return <div>热烈欢迎!<NavLink to="/edit"><h4>组织管理</h4></NavLink></div>
 }
}
export default MainPage;
