/**
 * Created by lucas on 9/19/16.
 */
import VisualizationTechnique from './VisualizationTechnique';

const d3 = require('d3');
const WIDTH = 640;
const HEIGHT = 480;

export default class BarChart extends VisualizationTechnique {

    static properties () {

        this._x = null;
        this._y = null;
        this._xAxis = null;
        this._yAxis = null;
        this._xAxisContainer = null;
        this._yAxisContainer = null;
    }

    constructor(container, data) {

        super(container, data);

        BarChart.properties.apply(this);

        this._margin.left = 30;

        this._width = WIDTH - this._margin.left - this._margin.right;
        this._height = HEIGHT - this._margin.top - this._margin.bottom;

        this._svgCanvas = d3.select(this._container).append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet");

        this._svgMargin = this._svgCanvas.append("g")
            .attr("class", "margin");

        this._svg = this._svgMargin.append("g")
            .attr("class", "display");

        this._x = d3.scaleBand()
            .padding(.3)
            .rangeRound([0, this._width]);

        this._y = d3.scaleLinear()
            .range([this._height, 0]);

        this._xAxis = d3.axisBottom(this._x);
            //.ticks(4);
            //.tickSize(-this._height);

        this._yAxis = d3.axisLeft(this._y)
            .ticks(4);
            //.tickSize(0);

        this._xAxisContainer = this._svgMargin.append("g")
            .attr("class", "x axis");

        this._yAxisContainer = this._svgMargin.append("g")
            .attr("class", "y axis");

        this._pallete = ['#EFB605', '#E79B01', '#E35B0F', '#DD092D', '#C50046', '#A70A61', '#892E83',
            '#604BA2', '#2D6AA6', '#089384', '#25AE64', '#7EB852', '#404040'];

        this._pallete.sort( (a, b) => d3.hsl(b).h - d3.hsl(a).h );

        this._defaultColor = "#45B6C5";

        this._color = d3.scaleOrdinal()
            .range(this._pallete);

        this.update(this._data);

    }

    x (x) {

        if (!arguments.length) {
            return this._x;
        }

        this._x = x;
    }

    y (y) {

        if (!arguments.length) {
            return this._y;
        }

        this._y = y;
    }

    xAxis (xAxis) {

        if (!arguments.length) {
            return this._xAxis;
        }

        this._xAxis = xAxis;
    }

    yAxis (yAxis) {

        if (!arguments.length) {
            return this._yAxis;
        }

        this._yAxis = yAxis;
    }

    width (value) {

        if (!arguments.length) {
            return this._width;
        }

        this._width = value - this._margin.left - this._margin.right;
        this._svgCanvas.attr("viewBox", "0 0 " + (this._width + this._margin.left + this._margin.right) +
            " " + (this._height + this._margin.top + this._margin.bottom));
    }

    height (value) {

        if (!arguments.length) {
            return this._height;
        }

        this._height = value - this._margin.top - this._margin.bottom;
        this._svgCanvas.attr("viewBox", "0 0 " + (this._width + this._margin.left + this._margin.right) +
            " "	+ (this._height + this._margin.top + this._margin.bottom));
    }

    xAxisContainer (xAxisContainer) {

        if (!arguments.length) {
            return this._xAxisContainer;
        }

        this._xAxisContainer = xAxisContainer;
    }

    yAxisContainer (yAxisContainer) {

        if (!arguments.length) {
            return this._yAxisContainer;
        }

        this._yAxisContainer = yAxisContainer;
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

    maxLeftMargin () {
        return WIDTH * 0.5;
    }

    longestLabelSize (labels) {

        let fontSize = parseInt(this._yAxisContainer.style("font-size").substring(0, 2)),
            leftMarginSize = d3.max(labels, function(d) { return d.length; }) * fontSize,
            maxLeftMarginValue = this.maxLeftMargin();

        return (leftMarginSize > maxLeftMarginValue) ? maxLeftMarginValue : leftMarginSize;
    }

    update(data) {

        this._data = data;

        // JOIN new data with old elements.
        let bar = this._svg.selectAll(".bar")
            .data(data, function(d) { return d.key; });

        // EXIT
        // Remove old elements as needed.
        bar.exit().attr("class", "exit")
            .transition(this._transition)
            .attr("y", (this._height / 4))
            .style("fill-opacity", "#CCCCCC")
            .style("fill-opacity", 1e-6)
            .remove();

        this._width = WIDTH - this._margin.left - this._margin.right;
        this._height = HEIGHT - this._margin.top - this._margin.bottom;

        this._svgCanvas
            .attr("viewBox", "0 0 " + (this._width + this._margin.left + this._margin.right) +
                " "	+ (this._height + this._margin.top + this._margin.bottom));

        this._svgMargin.attr("transform", "translate(" + (this._margin.left) + "," + (this._margin.top) + ")");

        this._x.rangeRound([0, this._width])
            .domain(this._data.map(d => d.key));

        this._y.range([this._height, 0])
            .domain([0, d3.max(this._data, d => d.value)]);
            //.nice();

        this._color.domain(this._data.map(d => d.group || null));

        // UPDATE old elements present in new data.
        bar.attr("height", this._x.bandwidth())
            .transition(this._transtion)
            .attr("height", d => this._height - this._y(d.value))
            .attr("y", d => this._y(d.value))
            .style("fill", d => (d.group) ? this._color(d.group) : this._defaultColor);

        // ENTER new elements present in new data.
        bar.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => this._x(d.key))
            .attr("y", this._height)
            .attr("width", this._x.bandwidth())
            .attr("height", 0)
            .style("fill", d => (d.group) ? this._color(d.group) : this._defaultColor)
            .transition(this._transition).delay(this._delay)
            .attr("y", d => this._y(d.value))
            .attr("height", d => this._height - this._y(d.value));

        this._xAxisContainer
            .attr("transform", "translate(0," + this._height + ")")
            .transition(this._transition)
            .call(this._xAxis);

        this._yAxisContainer.transition(this._transition)
            .call(this._yAxis);

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


        let x0 = this._x.domain(this._data.map(d => d.key))
            .copy();

        this._svg.transition(this._transition).selectAll(".bar")
            .delay(this._delay)
            .attr("x", d => x0(d.key) );

        this._xAxisContainer.transition(this._transition)
            .call(this._xAxis)
            .selectAll("g")
            .delay(this._delay);
    }
}
