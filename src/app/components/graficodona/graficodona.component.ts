import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficodona',
  templateUrl: './graficodona.component.html',
  styleUrls: []
})
export class GraficodonaComponent implements OnInit {

   // Doughnut
   @Input() datosGrafica: any = {};

  constructor() { }

  ngOnInit() {
  }

}
