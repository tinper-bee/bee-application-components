/**
 * Created by yuzhao on 2017/6/7.
 */


import React,{Component} from 'react';
import {Navbar,Button,Con,Col,Tile,Icon} from 'tinper-bee';
import axios from 'axios';

const Menu = Navbar.Menu;

class UserMenus extends Component {
    constructor(props) {
        super(props);

        var self = this;

        this.state = {
            userMenus:[]
        };

    }
    formmaterUrl(item) {
        var uri = " ";
        if (item.urlType === 'url') {
            var target=item.openview=="blank"?"_blank":"";
            if(target){
                uri = '#/ifrNoHead/' + encodeURIComponent(encodeURIComponent(item.url));
            }else{
                uri = '#/ifr/' + encodeURIComponent(encodeURIComponent(item.url));
            }
            return  uri;
        } else if (item.urlType === 'plugin') {
            uri = item.code ? ('#/' + item.code) : "#/index_plugin";
            //window.registerRouter(uri.replace("#", ""), item.location);

            uri = encodeURIComponent(encodeURIComponent('index-view.html'+uri));
            return  uri;
        } else if (item.urlType === 'view') {
            uri = item.code;

            uri= uri.replace("#", "/");

            // if(uri[0]=='/'){
            //     uri = "/sidebar"+uri;
            // }else{
            //     uri = "/sidebar/"+uri;
            // }
            // window.addRouter(uri);
            // return  "#"+uri;

            return encodeURIComponent(encodeURIComponent('index-view.html#'+uri));

        }else if(item.urlType == undefined){
            item.code = '404';
            return  '#/ifr/' + encodeURIComponent(encodeURIComponent(item.code));
        }
        else {
            return item.code;
        }
    }

    componentWillReceiveProps(nextProps) {

    }
    componentDidMount(){

        var self = this;
        //
        axios.get(contextRoot +'/moreMenu/list?r='+Math.random())
            .then(function (res) {
                if(res.data.status==1){
                    self.setState({
                        userMenus: res.data.data
                    });
                }

            }).catch(function (err) {
                console.log(err);
            });


    }
    handleClick (e) {
        this.props.handleClick(e);
    }
    confirm (){
        var tabs = JSON.parse(sessionStorage['tabs'])
        if (tabs.length>1) {
            var r = confirm("注销后您打开的页签数据会自动清空");
            if(r==true){
                location.href = 'user/beflogout';
            }
        }
        else {
            location.href = 'user/beflogout';
        }
    }

    render() {

        var self = this;


        return (
            <Menu onClick={(e) => self.handleClick(e)} className="dropdown-menus" style={{ width: '100%' }} mode="inline">

                {
                    self.state.userMenus.map(function (item) {
                        var value = {
                            title:item.name,
                            router:self.formmaterUrl(item)
                        };
                        return (
                            <li className="u-menu-item" style={{paddingLeft:16}}>
                                <a ref={item.code} value={item.code} onClick={(e) => self.props.handleDefault(e)} name={item.name} title={item.name} href={self.formmaterUrl(item)}>
                                    <i className={item.icon}></i>{item.name}
                                </a>
                            </li>
                        )
                    })
                }

                <li className="u-menu-item" style={{paddingLeft:16}}>
                    <a ref="setting3" title="注销"  value="logout" href={'user/beflogout'}><i aria-hidden="true" className="qy-iconfont icon-tubiao-zhuxiao"></i> 注销</a>
                </li>
            </Menu>
        )
    }
}

export default UserMenus;

