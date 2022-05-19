import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-circle-diagram',
  templateUrl: './circle-diagram.component.html',
  styleUrls: ['./circle-diagram.component.css']
})
export class CircleDiagramComponent implements OnInit {
  data: any = [40, 10, 20, 60, 30];
  side: string = "right";
  title = 'Circle-Diagram';
  width: number;
  height: number;

  margin = { top: 200, right: 200, bottom: 300, left: 500 };

  constructor() {
    this.width = 800 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit(): void {
    this.update1();
  }

  update1() {
    this.data = [];
    for (let i = 0; i < 5; i++) {
      this.data.push(Math.random() * 800);
    }

    d3.select('svg')
      .selectAll('circle')
      .data(this.data)
      .join('circle')
      .attr('cy', 50)
      .attr('r', 40)
      .attr('fill', '#6D597A')
      .attr('opacity', 0.7)
      .transition()
      .attr('cx', (d: any) => d);
  }

  update2() {
    this.data = [];
    for (let i = 0; i < 5; i++) {
      this.data.push({
        x: this.random(800),
        r: this.random(40),
        fill: d3.rgb(this.random(255), this.random(255), this.random(255))
      });
    }

    d3.select('svg')
      .selectAll('circle')
      .data(this.data)
      .join('circle')
      .attr('cy', 50)
      .transition()
      .attr('opacity', 0.7)
      .transition()
      .attr('cx', (d: any) => d.x)
      .attr('r', (d: any) => d.r)
      .attr('fill', (d: any) => d.fill)
    // .duration(1000);
  }

  update3() {
    this.side = this.side === 'left' ? 'right' : 'left';
    this.data = [];
    for (let i = 0; i < 10; i++) {
      this.data.push({ x: this.side === "left" ? 300 - i * 25 : 800 - i * 25 });
    }

    d3.select('svg')
      .selectAll('circle')
      .data(this.data)
      .join('circle')
      .attr('cy', 50)
      .attr('r', 10)
      .attr('fill', '#6D597A')
      .transition()
      .attr('opacity', 0.7)
      // .transition()
      .delay((d: any, i: number) => i * 75)
      .attr('cx', (d: any) => d.x)
  }

  update4() {
    this.data = [];
    for (let i = 0; i < 5; i++) {
      this.data.push(Math.random() * 800);
    }

    d3.select('svg')
      .selectAll('circle')
      .data(this.data)
      .join('circle')
      .attr('cy', 50)
      .attr('r', 40)
      .transition()
      .duration(1000)
      // .ease(d3.easeBackInOut)
      // .ease(d3.easeBounce)
      // .ease(d3.easeBounceIn)
      // .ease(d3.easeBounceInOut)
      // .ease(d3.easeCircle)
      // .ease(d3.easeCircleIn)
      // .ease(d3.easeCircleOut)
      // .ease(d3.easeCubic)
      // .ease(d3.easeCubicIn)
      // .ease(d3.easeElastic)
      // .ease(d3.easeElasticIn)
      // .ease(d3.easeElasticOut)
      .attr('cx', (d: any) => d);
  }

  update5() {
    this.data = [];
    for(let i=0; i<5; i++) {
      this.data.push({
        x: Math.random() * 800,
        r: Math.random() * 40
      });
    }

    d3.select('svg')
		.selectAll('circle')
		.data(this.data)
		.join('circle')
		.attr('cy', 50)
		.transition()
		.attr('cx', (d:any) => d.x)
		.transition()
		.duration(750)
		.ease(d3.easeBounce)
		.attr('r', (d:any) => d.r);
  }

  random(x: number) { return Math.floor(Math.random() * x); }

}
