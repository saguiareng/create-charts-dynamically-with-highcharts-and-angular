import {
  Component,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { HighchartsService } from './highcharts.service';

import * as Highcharts from 'highcharts';
//import 'highcharts/adapters/standalone-framework.src';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('charts') public chartEl: ElementRef;

  chartsList;
  const myCustomOptions = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Stacked bar chart'
    },
    xAxis: {
      categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total fruit consumption'
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [{
      name: 'John',
      data: [5, 3, 4, 7, 2]
    }, {
      name: 'Jane',
      data: [2, 2, 3, 2, 1]
    }, {
      name: 'Joe',
      data: [3, 4, 4, 2, 5]
    }]
  };

  constructor(private hcs: HighchartsService, private changeDetectionRef: ChangeDetectorRef) {
  }

  public ngAfterViewInit() {
  }

  public ngOnDestroy() {
  }

  rmFirst() {
    this.hcs.removeFirst();
    this.changeDetectionRef.detectChanges();
    if (!!document.getElementById("test").firstChild) document.getElementById("test").firstChild.outerHTML = '';
    console.log('rm first', this.hcs.getCharts());
  }

  rmLast() {
    this.hcs.removeLast();
    this.changeDetectionRef.detectChanges();
    if (!!document.getElementById("test").lastChild) document.getElementById("test").lastChild.outerHTML = '';
    console.log('rm last', this.hcs.getCharts());
  }

  createChart() {
    this.hcs.createChart(this.chartEl.nativeElement);
  }

  createCustomChart(myOpts: Object) {
    this.hcs.createChart(this.chartEl.nativeElement, myOpts);
  }
}