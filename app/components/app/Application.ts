import {MapChart} from '../mapchart/MapChart';
import {BarChart} from '../barchart/BarChart';
import {TopologyService} from '../../services/TopologyService';
import {StatisticService} from "../../services/StatisticService";

let template = require('./Application.html');
require('./Application.less');

export class Application{

    el:HTMLElement;

    /**
     * Creates main application
     */
    constructor(el: HTMLElement){
        this.el = el;

        el.innerHTML = template;

        this.initMapChart();
        this.initBarChart();
    }

    /**
     * Initializes map chart inside application content and provides data for rendering
     */
    private initMapChart(){
        let mapChart = new MapChart(document.getElementById('mapchart'));
        mapChart.render(TopologyService.getData(), StatisticService.getData());
    }

    private initBarChart(){
        let barChart = new BarChart(document.getElementById('barchart'));
        barChart.render(StatisticService.getDataAsArray());
    }
}