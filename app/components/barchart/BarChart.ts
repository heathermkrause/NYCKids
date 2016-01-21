import * as d3 from 'd3';
import * as $ from 'jquery'
import {Tooltip} from "../tooltip/Tooltip";

require('./BarChart.less');

let line = function (node, x, y, x1, y1) {
    return node.append('line')
        .attr('x1', x)
        .attr('y1', y)
        .attr('x2', x1)
        .attr('y2', y1);
};

export class BarChart {
    private el:HTMLElement;
    private $el:JQuery;

    private tooltip: Tooltip;

    private h = 15;
    private dh = 2;

    private width;

    private COLORS = ['#f52887', '#27F595'];
    private DOMAIN = [-0.5, 0.5];
    private MARGIN_LEFT = 150;


    /**
     * Creates new bar chart component
     * @param el
     */
    constructor(el:HTMLElement) {
        this.el = el;
        this.$el = $(this.el);

        this.tooltip = new Tooltip();
    }

    /**
     * Rendering provided data
     * @param data
     */
    render(data) {
        this.sortData(data);

        let width = this.width = this.$el.width() - this.MARGIN_LEFT;
        let height = data.length * (this.dh + this.h);

        let svg = d3.select(this.el).append("svg")
            .attr('class', 'map')
            .attr('width', width + this.MARGIN_LEFT)
            .attr('height', height);

        let viz = svg.append('g')
            .attr('transform', 'translate(' + (this.MARGIN_LEFT + (width / 2)) + ', 0)');

        let scale = d3.scale.linear().domain(this.DOMAIN).range([-width / 2, width / 2]);
        let colorScale = d3.scale.linear().domain(this.DOMAIN).range(<any>this.COLORS);

        let value = function (d) {
            return d['communityPerformance'];
        };

        let x = function (d) {
            var x = value(d);
            return x < 0 ? scale(x) : 0;
        };

        /// Generate axis
        line(viz, 0, 0, 0, height).attr('class', 'center');
        line(viz, -width / 2, 0, -width / 2, height);
        line(viz, -width / 2, height, width / 2, height);

        let g = viz.selectAll('rect').data(data).enter();
        let self = this;

        g.append('rect')
            .attr('x', x)
            .attr('y', (d, i) => i * (this.h + this.dh))
            .attr('height', this.h)
            .attr('width', (d, i) => Math.abs(scale(value(d))))
            .attr('fill', (d) => colorScale(value(d)))
            .on('mouseover', function(d){ self.showTooltip(d3.mouse(this), d); })
            .on('mousemove', function(d){ self.showTooltip(d3.mouse(this), d); })
            .on('mouseout', () => this.tooltip.hide())
        ;

        g.append('text')
            .text(d => (<any>d).geography)
            .attr('y', (d, i) => i * (this.h + this.dh) + 14)
            .attr('x', -width / 2 - 10)
            .attr('text-anchor', 'end')
        ;

    }

    /**
     * Shows tooltip
     * @param xy
     * @param d
     * @param stat
     */
    private showTooltip(xy, d){
        if(!d){
            return;
        }

        let offset = this.$el.offset();

        let text = `
        <strong>Community Performance:</strong> ${d.communityPerformance}<br/>
        <strong>Strength:</strong> ${d.strength}<br/>
        <strong>Weakness:</strong> ${d.weakness}
        `;

        let y = xy[1] + offset.top + 5;
console.log($(window).scrollTop());
        if(y + this.tooltip.offsetHeight() - $(window).scrollTop() > $(window).height()){
            y -= (this.tooltip.offsetHeight() + 10);
        }

        this.tooltip.show(text, y + 'px', xy[0] + offset.left  + 5 + (this.width / 2) + 'px');
    }

    /**
     * Sort data by community performance
     * @param data
     * @returns {any}
     */
    private sortData(data:Array<any>) {
        let cond = function(a, b){
            return +a.communityPerformance < +b.communityPerformance ? 1 : +a.communityPerformance > +b.communityPerformance ? -1 : 0;
        };
        data.sort(cond);
    }
}