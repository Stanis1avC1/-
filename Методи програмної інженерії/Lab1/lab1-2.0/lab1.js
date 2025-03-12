function net(svg, width, height) {
    const gridSize = 50;
    svg.append("g")
        .selectAll("line.vertical")
        .data(d3.range(0, width, gridSize))
        .enter()
        .append("line")
        .attr("x1", d => d)
        .attr("y1", 0)
        .attr("x2", d => d)
        .attr("y2", height)
        .attr("stroke", "#00ff00")
        .attr("stroke-width", 0.5);

    svg.append("g")
        .selectAll("line.horizontal")
        .data(d3.range(0, height, gridSize))
        .enter()
        .append("line")
        .attr("x1", 0)
        .attr("y1", d => d)
        .attr("x2", width)
        .attr("y2", d => d)
        .attr("stroke", "#00ff00")
        .attr("stroke-width", 0.5);

    svg.append("line")
        .attr("x1", width / 2)
        .attr("y1", 0)
        .attr("x2", width / 2)
        .attr("y2", height)
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    svg.append("line")
        .attr("x1", 0)
        .attr("y1", height / 2)
        .attr("x2", width)
        .attr("y2", height / 2)
        .attr("stroke", "black")
        .attr("stroke-width", 1);
}

function move() {
    d3.select("#graph").html("");
    const width = 600, height = 400;
    const svg = d3.select("#graph").append("svg")
        .attr("width", width)
        .attr("height", height);

    net(svg, width, height);
    
    const x0 = parseFloat(document.getElementById("x0").value);
    const y0 = parseFloat(document.getElementById("y0").value);
    const angle = parseFloat(document.getElementById("angle").value) * Math.PI / 180;
    const v0 = parseFloat(document.getElementById("velocity").value);
    const a = parseFloat(document.getElementById("acceleration").value);
    const color = document.getElementById("color").value;

    let points = [];
    let x = x0, y = y0;
    let vx = v0 * Math.cos(angle);
    let vy = v0 * Math.sin(angle);
    let t = 0, dt = 0.1;

    while (y >= 0 && x < width) {
        x = x0 + vx * t;
        y = y0 + vy * t + 0.5 * a * t * t;
        if (y >= 0) {
            points.push([x + width / 2, height / 2 - y]);
        }
        t += dt;
    }

    svg.append("path")
        .datum(points)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", d3.line()
            .x(d => d[0])
            .y(d => d[1])
        );
}

function delet() {
    d3.select("#graph").html("");
}