import React,{ createElement, Component } from 'react';
import { render,findDOMNode } from 'react-dom';
import {Navbar,Col,Badge,Tile,Icon,Tooltip,Panel,Row} from 'tinper-bee';
var axios = require('axios');
var highlight = require('highlight.js');
var marked = require('marked');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});



export default function wrapperComponent(child,source) {

    return class wrappers extends Component {

        constructor(props, context) {
            super(props, context);

            this.state = {
                code: '',
                docs:''
            };

        }
        componentDidUpdate (){

        }

        componentDidMount(){


        }

        componentWillMount() {
            var self = this;
            axios.get('/src/application/'+source+'/Main.js').then(function(response) {
                self.setState({
                    code:highlight.highlightAuto(response.data).value
                })
            });
            axios.get('/src/application/'+source+'/docs/index.md').then(function(response) {
                self.setState({
                    docs:response.data
                })
            });
        }

        render() {
            var self = this;
            return (
                <div className="content">
                    <Col md={10}>
                        <Panel header="文档展示">
                            <div dangerouslySetInnerHTML={{__html:marked(self.state.docs)}}></div>
                        </Panel>
                        <Panel header="实例展示" >
                            {createElement(child)}
                        </Panel>
                        <Panel header="代码演示" >
                            <pre>
                                <code className="hljs">
                                    <div dangerouslySetInnerHTML={{__html:self.state.code}}></div>
                                </code>
                            </pre>

                        </Panel>
                    </Col>
                    <Col md={2}>
                        <Panel header="组件目录结构">
                            <iframe src={'/src/application/'+source} width="100%" frameBorder="0"></iframe>
                        </Panel>
                    </Col>
                </div>
            )
        }

    }


}