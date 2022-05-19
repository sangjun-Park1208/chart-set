import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Axis from 'd3-axis';
import * as d3Format from 'd3-format';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.css']
})
export class ScatterPlotComponent implements OnInit {
  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
    {"Framework": "BottleNeck", "Stars": "160052", "Released": "2010"}
  ];
  private svg: any;
  private margin = 50;
  private width = 900 - (this.margin * 2);
  private height = 400 - (this.margin);
  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawPlot();
  }
  private createSvg(): void {
    this.svg = d3.select("figure#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }
  private drawPlot(): void {
    // Add X axis
    const x = d3Scale.scaleLinear()
    .domain([2009, 2017])
    .range([ 0, this.width ]);
    
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .transition()
    .duration(1000)
    .call(d3Axis.axisBottom(x).tickFormat(d3Format.format("d")));

    // Add Y axis
    const y = d3Scale.scaleLinear()
    .domain([0, 190000])
    .range([ this.height, 0]);
    this.svg.append("g")
    .transition()
    .duration(1000)
    .call(d3Axis.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');
    dots.selectAll("dot")
    .data(this.data)
    .enter()
    .append("circle")
    // .transition()
    // .duration(3000)
    .attr("cx", (d: { Released: d3Scale.NumberValue; }) => x(d.Released))
    .attr("cy", (d: { Stars: d3Scale.NumberValue; }) => y(d.Stars))
    .transition()
    .duration(3000)
    .attr("r", 7)
    // .transition()
    // .duration(3000)
    .style("opacity", .5)
    .style("fill", "#69b3a2");

    // Add labels
    dots.selectAll("text")
    .data(this.data)
    .enter()
    .append("text")
    .transition()
    .duration(3000)
    .attr("x", (d: { Released: d3Scale.NumberValue; }) => x(d.Released))
    .attr("y", (d: { Stars: d3Scale.NumberValue; }) => y(d.Stars))
    // .transition()
    // .duration(3000)
    .text((d: { Framework: any; }) => d.Framework)

  }
}
