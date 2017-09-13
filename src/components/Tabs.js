/**
 * Created by yuzhao on 2017/5/31.
 */

import React,{Component} from 'react';
import {Button,Con,Col,Tile,Icon,Tooltip} from 'tinper-bee';
require('../tabs.css');

class Tab extends Component {
    constructor(props) {
        super(props);

        var self = this;

        var value = typeof sessionStorage['tabNotice']=='undefined'?true:sessionStorage['tabNotice'];

        this.state = {
            menus:props.menus,
            current:props.current,
            tabNum:props.menus.length,
            tabNotice:JSON.parse(value),
            showNotice:props.showNotice
        };

        this.setCurrent = this.setCurrent.bind(this);
        this.del = this.del.bind(this);
    }
    setCurrent (id) {
        this.props.setCurrent(id);
    }

    del (id) {

        var menu = this.state.menus;
        var current = this.state.current;

        var num = 0;
        for(var i=0;i<menu.length;i++){
            if(id==menu[i].id){
                menu.splice(i,1);
                num = i-1;
            }
        }


        var data = {
            menus:menu
        }


        //删除选中的tab时
        if(current==id){
            data.current=menu[num].id;
            data.router=menu[num].router;

            //window.router.dispatch('on', data.router.replace(match,'\/ifr'));

            //window.location.hash = data.router.replace(match,'#\/ifr')
        }

        var match = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;


        var ifr = document.getElementById(id);

        if(ifr.src.match(match)!=null){
            if(ifr.src.match(location.host)!=null){
                if(ifr.contentWindow.confirmClose&&typeof ifr.contentWindow.confirmClose=='function'){
                    ifr.contentWindow.confirmClose(id,data);
                    return false;
                }
            }
        }



        this.setState({
            tabNum:menu.length
        });

        this.props.del(data);

        return menu;
    }

    notice() {
        var value = this.state.tabNotice;

        sessionStorage['tabNotice'] = !value;

        this.setState({
            tabNotice:!value
        })
    }
    componentDidUpdate(){
        this.tabNotice();
    }
    tabNotice (){
        if(this.state.menus.length>=11) {
            var dom = ReactDOM.findDOMNode(this.refs['tabNotice']);
            if(dom){
                dom.style.display = '';
            }
            setTimeout(function () {
                if(dom){
                    dom.style.display = 'none';
                }
            },2000)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({current: nextProps.current,showNotice:nextProps.showNotice,menus:nextProps.menus,tabNum:nextProps.menus.length});
    }
    render() {

        var self = this;


        return (
            <div>
                <div id="portalTabs" className={"tabs ui-tabs-num-"+this.state.tabNum}>
                    <div className="tabs-list-box">
                        {/*<span className="tabs-list-home">*/}
                            {/*<i className="qy-iconfont icon-tubiao-shouye"></i>*/}
                        {/*</span>*/}
                        <ul className="tabs-list">
                            {
                                self.state.menus.map(function (item,index) {

                                    var delIcon = index==0?'':(<i onClick={self.del.bind(this,item.id)} className="qy-iconfont icon-tubiao-guanbi x-close" key={item.router}></i>)

                                    var homeIcon = index==0?<i className="qy-iconfont icon-tubiao-shouye"></i>:item.title;

                                    var selected = self.state.current==item.id?'selected':'';

                                    return (
                                        <li className={selected}>
                                            <a onClick={self.setCurrent.bind(this,item.id)} href="javascript:;" title={item.title}>
                                                {homeIcon}
                                            </a>
                                            {delIcon}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

                {
                    (self.state.menus.length>=11&&self.state.tabNotice&&self.state.showNotice)?(
                        (<div ref="tabNotice" className="portalTabs-message" >
                            <p>
                                <i className="uf qy-iconfont icon-tubiao-jingshi"></i> 抱歉，页面最多展示10个窗口！
                            </p>
                            <span style={{display:'none'}} onClick={this.notice.bind(this)}>不再显示</span>
                        </div>)
                    ):null
                }

            </div>
        )
    }
}

export default Tab;