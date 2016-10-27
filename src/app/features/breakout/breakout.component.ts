import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { curryRight } from 'lodash';

@Component({
  selector: 'my-breakout',
  templateUrl: './breakout.component.html'
})

export class BreakoutComponent implements AfterViewInit, OnDestroy {

  /**
   * The canvas rendering context
   *
   * @type {CanvasRenderingContext2D}
   * @memberOf BreakoutComponent
   */
  ctx: CanvasRenderingContext2D;

  subscriptions: Subscription[] = [];

  /**
   * The canvas element
   *
   * @type {{ nativeElement: HTMLCanvasElement }}
   * @memberOf BreakoutComponent
   */
  @ViewChild('myCanvas') canvasEl: { nativeElement: HTMLCanvasElement };

  /**
   * Set the color of the next drawing
   *
   * @param {string} color
   * @returns {BreakoutComponent} the BreakoutComponent instance
   *
   * @memberOf BreakoutComponent
   */
  setFill(color: string) {
    this.ctx.fillStyle = color;

    return this;
  }

  /**
   * Draw a circle at `centerCoordinates` the size of `radius`.
   *
   * @param {{x: number, y: number}} centerCoordinates
   * @param {number} radius
   * @param {number} [startAngle=0]
   * @param {any} [endAngle=Math.PI * 2]
   * @param {boolean} [anticlockwise=true]
   * @returns {BreakoutComponent} the BreakoutComponent instance
   *
   * @memberOf BreakoutComponent
   */
  drawCircle(
    centerCoordinates: { x: number, y: number },
    radius: number,
    startAngle = 0,
    endAngle = Math.PI * 2,
    anticlockwise = true
  ) {
    let {x, y} = centerCoordinates;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    this.ctx.closePath();
    this.ctx.fill();

    return this;
  }

  /**
   * Clear a square from the top left corner to length
   *
   * @param {number} [length=300]
   *
   * @memberOf BreakoutComponent
   */
  clearCanvas(length = 300) {
    this.ctx.clearRect(0, 0, length, length);
  }

  /**
   * Animate a drawing by drawing it over and over again
   *
   * @param {Function} drawFn
   * @param {any} [direction={ x: 2, y: 4 }]
   * @param {any} [initialCoords={ x: 0, y: 0 }]
   * @returns {Subscription}
   *
   * @memberOf BreakoutComponent
   */
  animatedDrawing(drawFn: Function, direction = { x: 2, y: 2 }, initialCoords = { x: 0, y: 0 }) {
    const {x, y} = direction;

    let interval = Observable.interval(10)
      .subscribe({
        next: (move: number) => {
          // clear canvas
          this.clearCanvas();
          // get new coordinates by multiplying direction by move and adding to initialCoords
          let newCoords = {
            x: x * move + initialCoords.x,
            y: y * move + initialCoords.y
          };

          // run draw function with coordinates

          drawFn(newCoords);
        },
        error: (err: any) => console.log(err),
        complete: () => console.log('animation finished')
      });

    return interval;
  }

  ngAfterViewInit() {
    console.log('test');

    this.ctx = this.canvasEl.nativeElement.getContext('2d');

    this.setFill('rgba(255, 0, 0, 0.5)')
      .drawCircle({ x: 100, y: 100 }, 30);

    const circleFn = curryRight(this.drawCircle.bind(this), 5)(30, 0, Math.PI * 2, true);

    // animate

    const animation = this.animatedDrawing(circleFn);

    this.subscriptions.push(animation);
    // unsubscribe after 5 seconds

    window.setTimeout(function () {
      animation.unsubscribe();
    }, 5000);

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
