async function draw() {
  // Data
  const dataset = await d3.json('data.json');
  const xAccessor = (data) => { return data.currently.humidity };
  const yAccessor = (data) => { return data.currently.apparentTemperature };

  // Dimensions
  let dimensions = {
    width: 800,
    height: 800,
    margin: {
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    }
  };

  dimensions.ctrWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.ctrHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom

  // Draw Image
  const svg = d3.select('#chart')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  const ctr = svg.append('g')
    .attr('transform', `translate(${dimensions.margin.left},${dimensions.margin.top})`);

  // Scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.ctrWidth])

  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([0, dimensions.ctrHeight])


  // Draw Circles
  ctr.selectAll('circle')
    .data(dataset)
    .join('circle')
    .attr('cx', (data) => { return xScale(xAccessor(data)) })
    .attr('cy', (data) => { return yScale(yAccessor(data)) })
    .attr('r', 5)
    .attr('fill', 'red')

}

draw()