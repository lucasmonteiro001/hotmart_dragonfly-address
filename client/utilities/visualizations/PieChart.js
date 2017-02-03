/**
 * Created by lucas on 9/19/16.
 */
import VisualizationTechnique from './VisualizationTechnique';

const d3 = require('d3');
const WIDTH = 640;
const HEIGHT = 480;

export default class PieChart extends VisualizationTechnique {

    static properties () {
        this._radius = 0;
        this._arc = null;
        this._label = null;
        this._pie = null;
    }

    constructor(container, data) {

        super(container, data);

        PieChart.properties.apply(this);
        // TODO Mover para VisualizationTechnique
        this._width = WIDTH - this._margin.left - this._margin.right;
        this._height = HEIGHT - this._margin.top - this._margin.bottom;
        // TODO Mover para VisualizationTechnique
        this._svgCanvas = d3.select(this._container).append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet");
        // TODO Mover para VisualizationTechnique
        this._svgMargin = this._svgCanvas.append("g")
            .attr("class", "margin");
        // TODO Mover para VisualizationTechnique
        this._svg = this._svgMargin.append("g")
            .attr("class", "display");

        this._arc = d3.arc()
            .innerRadius(0);

        this._label = d3.arc();

        this._pie = d3.pie()
            .sort(d3.descending)
            .value(d => d.value);

        // TODO Mover para VisualizationTechnique
        this._pallete = ['#EFB605', '#E79B01', '#E35B0F', '#DD092D', '#C50046', '#A70A61', '#892E83',
            '#604BA2', '#2D6AA6', '#089384', '#25AE64', '#7EB852', '#404040'];
        // TODO Mover para VisualizationTechnique
        this._pallete.sort( (a, b) => d3.hsl(a).h - d3.hsl(b).h );
        // TODO Mover para VisualizationTechnique
        this._defaultColor = "#45B6C5";
        // TODO Mover para VisualizationTechnique
        this._color = d3.scaleOrdinal()
            .range(this._pallete);

        this.update(this._data);

    }

    // TODO Mover para VisualizationTechnique
    width (value) {

        if (!arguments.length) {
            return this._width;
        }

        this._width = value - this._margin.left - this._margin.right;
        this._svgCanvas.attr("viewBox", "0 0 " + (this._width + this._margin.left + this._margin.right) +
            " " + (this._height + this._margin.top + this._margin.bottom));
    }
    // TODO Mover para VisualizationTechnique
    height (value) {

        if (!arguments.length) {
            return this._height;
        }

        this._height = value - this._margin.top - this._margin.bottom;
        this._svgCanvas.attr("viewBox", "0 0 " + (this._width + this._margin.left + this._margin.right) +
            " "	+ (this._height + this._margin.top + this._margin.bottom));
    }

    xScale (value) {

        if (!arguments.length) {
            return this._x;
        }

        this._x = value;
    }

    yScale (value) {

        if (!arguments.length) {
            return this._y;
        }

        this._y = value;
    }

    // TODO enter OK, falta Implementar exit e update
    update(data) {

        this._data = data;

        // JOIN new data with old elements.
        let arcs = this._svg.selectAll(".arc")
            .data(this._pie(data));
/*
        // EXIT
        // Remove old elements as needed.
        bar.exit().attr("class", "exit")
            .transition(this._transition)
            .attr("x", (this._width / 4))
            .style("fill-opacity", "#CCCCCC")
            .style("fill-opacity", 1e-6)
            .remove();
*/
        this._width = WIDTH - this._margin.left - this._margin.right;
        this._height = HEIGHT - this._margin.top - this._margin.bottom;

        this._svgCanvas
            .attr("viewBox", "0 0 " + (this._width + this._margin.left + this._margin.right) +
                " "	+ (this._height + this._margin.top + this._margin.bottom));

        this._svgMargin.attr("transform", "translate(" + (this._margin.left + (this._width / 2)) + "," + (this._margin.top + (this._height / 2)) + ")");

        this._radius = Math.min(this._width, this._height) / 2.5;
        this._arc.outerRadius(this._radius);

        this._label.outerRadius(this._radius / 2)
            .innerRadius(this._radius / 2);


        this._color.domain(this._data.map(d => d.group || d.key));

        // TODO
        // UPDATE old elements present in new data.

        // ENTER new elements present in new data.
        let enterSelection = arcs.enter()
            .append("g")
                .attr("class", "arc");

        enterSelection.append("path")
                .style("fill", d => (d.group) ? this._color(d.data.group) : this._color(d.data.key))
                .transition(this._transition)
                .ease(d3.easeBounceOut)
                .attrTween("d", this.animatePie.bind(this));

        enterSelection.append("text")
                .attr("class", "label-pie-chart")
                .attr("dy", ".35em")
                .attr("text-anchor", "middle")
                .style("opacity", 0)
                .transition(this._transition).delay(this._delay)
                .attr("transform", d => "translate(" + this._label.centroid(d) + ")")
                .style("opacity", 1)
                .text(d => d.data.key);


    }

    // FIXME A função deve ser chamada na linha 147
    // Quando retorna ao invés de executar a função anônima
    // ela é interpretada como uma string e concatenada a variável d =\
    // function(t) {return this._arc(i(t)); };
    animatePie(slice) {
        slice.innerRadius = 0;
        let i = d3.interpolate({ startAngle: 0, endAngle: 0 }, slice);

        return (function(t) { return this._arc(i(t)); }).bind(this);

    }

    sort (value) {

        switch(value) {

            case "nameASC":
                this._data.sort( (a, b) => d3.ascending(a.key, b.key) );
                break;

            case "nameDSC":
                this._data.sort( (a, b) => d3.descending(a.key, b.key) );
                break;

            case "valueASC":
                this._data.sort( (a, b) => a.value - b.value );
                break;

            case "valueDSC":
                this._data.sort( (a, b) => b.value - a.value );
                break;

            case "groupASC":
                this._data.sort( (a, b) => d3.ascending(a.group, b.group) );
                break;

            case "groupDSC":
                this._data.sort( (a, b) => d3.descending(a.group, b.group) );
                break;

            default:
                break;
        }

    }

}
