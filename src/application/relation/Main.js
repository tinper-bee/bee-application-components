import React,{Component,PropTypes} from 'react';
import {Row, Col, Tile,Select} from 'tinper-bee';
var server25 = require('./assets/icon_svg/server25.svg');
var server25_hover = require('./assets/icon_svg/server25-hover.svg');
require('./assets/css/index.css');

class MainPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentAppId: "Apple",
            nodesList:[]
        }

    }
    componentDidMount() {
        const self = this;
        this.init();
    }
    filterData(data, current){
        var d = [];
        for(var i=0;i<data.length;i++){
            if(data[i].source==current||data[i].target==current){
              d.push(data[i]);
            }
        }
        return d;
    }
    handleChange(value){

      this.clear();

      this.setState({
        'currentAppId':value
      });


      this.init(value);
    }
    clear(){
      var svg = d3.select("svg");
      svg.selectAll('*').remove();
    }
    init(value){

      var current = value || this.state.currentAppId;

      var linksData = [
        {source: "Microsoft", target: "Amazon", type: "licensing"},
        {source: "Microsoft", target: "HTC", type: "licensing"},
        {source: "Samsung", target: "Apple", type: "suit"},
        {source: "Motorola", target: "Apple", type: "suit"},
        {source: "Nokia", target: "Apple", type: "resolved"},
        {source: "HTC", target: "Apple", type: "suit"},
        {source: "Kodak", target: "Apple", type: "suit"},
        {source: "Microsoft", target: "Barnes & Noble", type: "suit"},
        {source: "Microsoft", target: "Foxconn", type: "suit"},
        {source: "Oracle", target: "Google", type: "suit"},
        {source: "Apple", target: "HTC", type: "suit"},
        {source: "Microsoft", target: "Inventec", type: "suit"},
        {source: "Samsung", target: "Kodak", type: "resolved"},
        {source: "LG", target: "Kodak", type: "resolved"},
        {source: "RIM", target: "Kodak", type: "suit"},
        {source: "Sony", target: "LG", type: "suit"},
        {source: "Kodak", target: "LG", type: "resolved"},
        {source: "Apple", target: "Nokia", type: "resolved"},
        {source: "Qualcomm", target: "Nokia", type: "resolved"},
        {source: "Apple", target: "Motorola", type: "suit"},
        {source: "Microsoft", target: "Motorola", type: "suit"},
        {source: "Motorola", target: "Microsoft", type: "suit"},
        {source: "Huawei", target: "ZTE", type: "suit"},
        {source: "Ericsson", target: "ZTE", type: "suit"},
        {source: "Kodak", target: "Samsung", type: "resolved"},
        {source: "Apple", target: "Samsung", type: "suit"},
        {source: "Kodak", target: "RIM", type: "suit"},
        {source: "Nokia", target: "Qualcomm", type: "suit"}
      ];

      function filterData(data, current) {
        var d = [];
        for (var i = 0; i < data.length; i++) {
          if (data[i].source == current || data[i].target == current) {
            d.push(data[i]);
          }
        }
        return d;
      }

      var links = filterData(linksData, current);

      var nodes = {};
      var nodesList = [];

      // Compute the distinct nodes from the links.
      linksData.forEach(function(link) {
        link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
        link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
      });

      for(var i in nodes) {
        nodesList.push(nodes[i]);
      }

      this.setState({
        nodesList:nodesList
      })


      var width = 960,
        height = 500;

      var force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([width, height])
        .linkDistance(60)
        .charge(-300)
        .on("tick", tick)
        .start();

      var svg = d3.select("body").select("svg")
        .attr("width", width)
        .attr("height", height);

      // Per-type markers, as they don't inherit styles.
      svg.append("defs").selectAll("marker")
        .data(["suit", "licensing", "resolved"])
        .enter().append("marker")
        .attr("id", function(d) { return d; })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", -1.5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5");

      var path = svg.append("g").selectAll("path")
        .data(force.links())
        .enter().append("path")
        .attr("class", function(d) { return "link " + d.type; })
        .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });

      var circle = svg.append("g").selectAll("image")
        .data(force.nodes())
        .enter().append("image")
        .attr("r", 6)
        .attr("xlink:href",function (d) {
          if(d.name==current){
            return server25_hover;
          }
          else {
            return server25;
          }
        })
        .attr('width',function (d) {
          if(d.name==current){
            return '50px';
          }
          else {
            return '30px';
          }
        })
        .attr('height',function (d) {
          if(d.name==current){
            return '50px';
          }
          else {
            return '30px';
          }
        })
        .on("mouseover",function(d,i){
          d3.select(this).attr("xlink:href",server25_hover);
        })
        .on("mouseout",function(d,i){
          if(d.name==current){
            return false;
          }
          d3.select(this).attr("xlink:href",server25)
        })
        .call(force.drag)


      var text = svg.append("g").selectAll("text")
        .data(force.nodes())
        .enter().append("text")
        .attr("x", 8)
        .attr("y", ".31em")
        .text(function(d) { return d.name; });

      // Use elliptical arc path segments to doubly-encode directionality.
      function tick() {
        path.attr("d", linkArc);
        circle.attr("transform", transform);
        text.attr("transform", transform);
      }

      function linkArc(d) {
        var dx = d.target.x - d.source.x,
          dy = d.target.y - d.source.y,
          dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
      }

      function transform(d) {
        return "translate(" + d.x + "," + d.y + ")";
      }

    }

    render() {

        var self = this;
        return (
          <div>
            <Select size="lg" defaultValue={this.state.currentAppId} style={{ width: 200,marginRight: 6 }} onSelect={this.handleChange.bind(this)}>
              {
                self.state.nodesList.map(function(item,index){

                  return (
                    <Option value={item.name}>{item.name}</Option>
                  )

                })
              }
            </Select>
            <svg></svg>
          </div>
        )
    }
}


export default MainPage;
