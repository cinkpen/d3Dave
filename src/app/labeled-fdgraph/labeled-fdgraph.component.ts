import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-labeled-fdgraph',
  templateUrl: './labeled-fdgraph.component.html',
  styleUrls: ['./labeled-fdgraph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LabeledFDGraphComponent implements OnInit {

  svg;
  colors;
  width;
  height;
  node;
  link;
  edgepaths;
  edgelabels;
  simulation;

  graph;

  constructor() { }

  ngOnInit() {
    this.runD3();
  }

  runD3() {
    this.colors = d3.scaleOrdinal(d3.schemeCategory10);

    this.svg = d3.select("svg"),
      this.width = +this.svg.attr("width"),
      this.height = +this.svg.attr("height")

    this.svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 21)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 13)
      .attr('markerHeight', 13)
      .attr('xoverflow', 'visible')
      .append('svg:path')
      .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
      .attr('fill', '#999')
      .style('stroke', 'none');

    this.simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d) => { return d.id; }).distance(200).strength(1))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(this.width / 2, this.height / 2))
      .alphaTarget(0.1)

    d3.json("./assets/graph.json", (error, graph) => {
      if (error) throw error;
      this.graph = graph;
      this.update(graph.links, graph.nodes);
    })

  }

  ticked() {

    let graphNodes = this.graph.nodes;
    // console.log("TICKED", graphNodes)
    this.link
      .attr("x1", (d) => { return d.source.x; })
      .attr("y1", (d) => { return d.source.y; })
      .attr("x2", (d) => { return d.target.x; })
      .attr("y2", (d) => { return d.target.y; });

    this.node
      .attr("transform", (d) => { return "translate(" + d.x + ", " + d.y + ")"; });

    this.edgepaths.attr('d', (d) => {
      // console.log(this.graph.nodes[d.source].x);
      // let src = graphNodes[d.source];
      // console.log("graphNodes: ", graphNodes, "... d.source: ", d.source, "... graphNodes[d.source]: ", graphNodes[d.source])
      // let dst = graphNodes[d.target];
      return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
    });

    this.edgelabels.attr('transform', function (d) {
      if (d.target.x < d.source.x) {
        var bbox = this.getBBox();

        var rx = bbox.x + bbox.width / 2;
        var ry = bbox.y + bbox.height / 2;
        return 'rotate(180 ' + rx + ' ' + ry + ')';
      }
      else {
        return 'rotate(0)';
      }
    });
  }

  update(links, nodes) {
    this.link = this.svg.selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr('marker-end', 'url(#arrowhead)')

    this.link.append("title")
      .text((d) => { return d.type; });

    this.edgepaths = this.svg.selectAll(".edgepath")
      .data(links)
      .enter()
      .append('path')
      .attr('class', 'edgepath')
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .attr('id', (d, i) => { return 'edgepath' + i })
      .style("pointer-events", "none");

    this.edgelabels = this.svg.selectAll(".edgelabel")
      .data(links)
      .enter()
      .append('text')
      .style("pointer-events", "none")
      .attr('class', 'edgelabel')
      .attr('id', (d, i) => { return 'edgelabel' + i })
      .attr('font-size', 10)
      .attr('dy', 10)
      .attr('fill', '#aaa')

    this.edgelabels.append('textPath')
      .attr('xlink:href', (d, i) => { return '#edgepath' + i })
      .style("text-anchor", "middle")
      .style("pointer-events", "none")
      .attr("startOffset", "50%")
      .text((d) => { return d.type });

    this.node = this.svg.selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .call(d3.drag()
        .on("start", (d) => this.dragstarted(d))
        .on("drag", (d) => this.dragged(d))
      //.on("end", dragended)
      );

    this.node.append("circle")
      .attr("r", 15)
      .style("fill", (d, i) => { return this.colors(i); })

    this.node.append("title")
      .text((d) => { return d.id; });

    this.node.append("text")
      .attr("dy", -20)
      .attr("dx", -20)
      .text((d) => { return d.name + ":" + d.label; });

    this.simulation
      .nodes(nodes)
      .on("tick", (d) => this.ticked());

    this.simulation.force("link")
      .links(links);


  }

  dragstarted(d) {
    if (!d3.event.active) this.simulation.alphaTarget(0.3).restart()
    d.fx = d.x;
    d.fy = d.y;
  }

  dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }




}

















