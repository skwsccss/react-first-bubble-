import React, { Component } from 'react';
import * as d3 from 'd3';

class Circle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userlist: props.userlist
        }
    }
    async componentWillReceiveProps(next) {
        var { userlist } = next;
        await this.setState({ userlist })
        if (userlist.length > 0) this.drawCircles();
    }

    drawCircles() {

        var { userlist } = this.state
        var json = userlist;

        var diameter = 600;

        var svg = d3.select('#graph').append('svg')
            .attr('width', diameter)
            .attr('height', diameter);

        var bubble = d3.layout.pack()
            .size([diameter, diameter])
            .value(function (d) { return d.size; })
            .sort(function (a, b) {
                return -(a.value - b.value)
            })
            .padding(3);

        // generate data with calculated layout values
        var nodes = bubble.nodes(processData(json))
            .filter(function (d) { return !d.children; }); // filter out the outer bubble

        var vis = svg.selectAll('g')
            .data(nodes);

        var elemEnter = vis.enter()
            .append("g");

        elemEnter.append('circle')
            .attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')'; })
            .attr('r', function (d) { return d.r; })
            .attr('style', function (d) { return 'fill: #' + Math.floor(Math.random() * 16777215).toString(16); });
        elemEnter.append("text")
            .attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')'; })
            .attr("dx", function (d) { return -20 })
            .text(function (d) { return d.name + '/' + d.amount });

        function processData(data) {
            var newDataSet = [];

            data.forEach(element => {
                newDataSet.push({ name: element.username, size: element.amount, amount: element.amount });
            });
            return { children: newDataSet };
        }

    }

    render() {
        return (
            <section id="graph"></section>
        )
    }

}

export default Circle;