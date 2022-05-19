import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-circle-diagram',
  templateUrl: './circle-diagram.component.html',
  styleUrls: ['./circle-diagram.component.css']
})
export class CircleDiagramComponent implements OnInit {
    // data = [ 40, 10, 20, 60, 30 ];
    data : any = [ 40, 10, 20, 60, 30 ];
    side : string = "right";
    title = 'Circle-Diagram';

  constructor() { }

  ngOnInit(): void {
    this.updateAll();
  }


updateData() {
	this.data = [];
	for(let i=0; i<5; i++) {
		this.data.push({
			x: this.random(800),
			r: this.random(40),
			fill: d3.rgb(this.random(255), this.random(255), this.random(255))
		});
	}
}

update1() {
	d3.select('svg')
		.selectAll('circle')
		.data(this.data)
		.join('circle')
		.attr('cy', 50)
		.attr('r', 40)
    .attr('fill', '#6D597A')
    .attr('opacity', 0.7)
    .transition()
    .attr('cx', (d:any) => d.x);
}

update2() {
	d3.select('svg')
		.selectAll('circle')
		.data(this.data)
		.join('circle')
		.attr('cy', 50)
    .transition()
    .attr('opacity', 0.7)
    .transition()
    .attr('cx', (d:any) => d.x)
    .attr('r', (d:any) => d.r)
    .attr('fill', (d:any) => d.fill)
    // .duration(1000);
}

update3() {
	this.side = this.side === 'left' ? 'right' : 'left';
	for(let i=0; i<10; i++) {
		this.data.push({x: this.side === "left" ? 300 - i * 25 : 800 - i * 25});
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
    .transition()
    .delay((d: any, i: number) => i*75)
    .attr('cx', (d:any) => d.x)


    // .attr('fill', (d:any) => d.fill)
    // .duration(1000);
}



updateAll() {
	this.updateData();
  // this.update1();
	// this.update2();
  this.update3();

}
random(x: number) {return Math.floor(Math.random() * x);}
	
}
