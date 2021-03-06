import * as d3 from 'd3';
import * as topojson from 'topojson';
import * as $ from 'jquery';
import {Tooltip} from "../tooltip/Tooltip";

require('./MapChart.less');

export class MapChart {
    private el:HTMLElement;
    private $el:JQuery;

    //private ZOOM:number = 79000;
    private ZOOM:(number)=>number = (w) => w * 79000 / 800;
    private CENTER:[number, number] = [-73.979, 40.70];
    private COLORS = ['#f52887', '#27F595'];
    private NO_STAT_COLOR = '#777';
    private DOMAIN = [-0.5, 0.5];

    private tooltip: Tooltip;

    /**
     * Creates new map chart component
     * @param el
     */
    constructor(el:HTMLElement) {
        this.el = el;
        this.$el = $(this.el);

        this.tooltip = new Tooltip();
    }

    /**
     * Renders map using d3
     */
    public render(data, stat) {
        let width = this.$el.width();
        let height = this.$el.height();

        let svg = d3.select(this.el).append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr('class', 'map');

        let colorScale = d3.scale.linear().domain(this.DOMAIN).range(<any>this.COLORS);

        let getStat = (d) => stat[d.properties.BoroCD];

        let projection = d3.geo.mercator()
            .center(this.CENTER)
            .scale(this.ZOOM(width))
            .translate([width / 2, height / 2]);

        let path = d3.geo.path().projection(projection);
        let self = this;

        svg.selectAll('path').data(topojson.feature(data, data.objects.nycd).features).enter().append('path')
            .attr('d', path)
            .attr('fill', d => getStat(d) ? colorScale(getStat(d).communityPerformance) : this.NO_STAT_COLOR)
            .on('mouseover', function(d){ self.showTooltip(d3.mouse(this), d, getStat(d)); })
            .on('mousemove', function(d){ self.showTooltip(d3.mouse(this), d, getStat(d)); })
            .on('mouseout', () => this.tooltip.hide())
    }

    private showTooltip(xy, d, stat){
        if(!d || !stat){
            return;
        }
        let offset = this.$el.offset();

        let text = `
        <strong>Kids index:</strong> ${stat.kidsIndex}<br/>
        <strong>Community Performance:</strong> ${stat.communityPerformance}<br/>
        <strong>Strength:</strong> ${stat.strength}<br/>
        `;

        this.tooltip.show(text, xy[1] + offset.top + 5 + 'px', xy[0] + offset.left  + 5 + 'px');
    }
}