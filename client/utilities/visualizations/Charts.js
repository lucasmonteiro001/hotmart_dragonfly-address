/**
 * Created by lucas on 11/14/16.
 */
import BarChart from './BarChart';
import HorizontalBar from './HorizontalBar';
import PieChart from './PieChart';

const SCATTERPLOT = "scatter-plot",
    LINECHART = "line-chart",
    VERTICALBARCHART = "vertical-bar-chart",
    HORIZONTALBARCHART = "horizontal-bar-chart",
    AREACHART = "area-chart",
    BARCHART = "bar-chart",
    PIECHART = "pie-chart";

export default {
    [HORIZONTALBARCHART]: HorizontalBar,
    [BARCHART]: BarChart,
    [PIECHART]: PieChart
}