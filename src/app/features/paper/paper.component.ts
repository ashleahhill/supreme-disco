import { Component, ViewChild, AfterViewInit } from '@angular/core';
import * as paper from 'paper';

@Component({
  selector: 'my-paper',
  templateUrl: './paper.component.html'
})

export class PaperComponent implements AfterViewInit {

  @ViewChild('myCanvas') canvasEl: any;

  /**
   * Paper.js example from http://paperjs.org/tutorials/getting-started/using-javascript-directly/
   *
   * @param {[number, number]} from
   * @param {[number, number]} to
   *
   * @memberOf PaperComponent
   */
  drawLine(fromPoint: [number, number], toPoint: [number, number]) {
    const path = new paper.Path();

    // Give the stroke a color
    path.strokeColor = 'black';

    const start = new paper.Point(...fromPoint);

    // Move to start and draw a line from there
    path.moveTo(start);

    // Note that the plus operator on Point objects does not work
    // in JavaScript. Instead, we need to call the add() function:
    path.lineTo(start.add(...toPoint));

    // Draw the view now:
    paper.view.draw();
  }

  ngAfterViewInit () {
    console.log('test');
    console.log(paper);

    paper.setup(this.canvasEl.nativeElement);

    this.drawLine([100, 100], [200, -50]);
  }

}
