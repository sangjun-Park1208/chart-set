import { Component, OnInit } from '@angular/core';
import { StatsBarChart } from '../../assets/data/data';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  currentRate = 8;
  title = 'Bar-chart';
  width: number;
  height: number;
  frequencies: [number];
  heights: [number];
  margin = { top: 20, right: 20, bottom: 30, left: 500 };
  x: any;
  y: any;
  svg: any;
  g: any;
  comment: string;

  constructor() {
    this.width = 800 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.frequencies = [0, ];
    this.heights = [0, ];
    this.comment = "";
  }

  ngOnInit() {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawBars();
  }

  initSvg() {
    this.svg = d3.select('#barChart')
      .append('svg')
      .attr('width', '50%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500');
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(StatsBarChart.map((d) => d.company));
    this.y.domain([0, d3Array.max(StatsBarChart, (d) => d.frequency)]);
  }

  drawAxis() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');
  }

  drawBars() {
    this.g.selectAll('bar')
      .data(StatsBarChart)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      // .transition() //---- 1(y축 상단)
      .attr('x', (d: any) => this.x(d.company))
      // .transition() //---- 2(x좌표만 지정된 상태)
      .attr('y', (d: any) => this.y(d.frequency))
      // .transition() //---- 3(x, y좌표 모두 지정된 상태, (2)와 y값 시작점 차이)
      .attr('width', this.x.bandwidth())
      .transition() // ---- 4(x, y좌표와 너비까지 지정된 상태)
      .attr('fill', '#498bfc')
      .attr('height', (d: any) => this.height - this.y(d.frequency))
      .duration(5000)
  }


}