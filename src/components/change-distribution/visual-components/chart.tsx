import React, { Component } from 'react';
import Chart from 'chart.js/auto';
import "./page.css";

interface Props {
  exchangeRates: number[];
  selectedCurrency: string;
  currency2: string;
}

class ChartComponent extends Component<Props> {
  chartRef: React.RefObject<HTMLCanvasElement>;
  chart: Chart | undefined;

  constructor(props: Props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.exchangeRates !== this.props.exchangeRates) {
      this.renderChart();
    }
  }

  calculateDifferences = (rates: number[]) => {
    const differences = rates.slice(1).map((rate, index) => Math.abs(rate - rates[index]).toFixed(3));
    const frequencyMap: { [key: string]: number } = {};

    differences.forEach(diff => {
      if (frequencyMap[diff]) {
        frequencyMap[diff]++;
      } else {
        frequencyMap[diff] = 1;
      }
    });

    const labels = Object.keys(frequencyMap);
    const frequencies = Object.values(frequencyMap);

    return { labels, frequencies };
  };

  renderChart = () => {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartRef.current!.getContext("2d");
    if (!ctx) return;

    const { exchangeRates} = this.props;
    const { labels, frequencies } = this.calculateDifferences(exchangeRates);

    this.chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: ``,
            data: frequencies,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: false,
              text: 'Frequency',
            },
          },
          x: {
            title: {
              display: false,
              text: 'Difference',
            },
          },
        },
      },
    });
  };

  render() {
    return <canvas ref={this.chartRef} />;
  }
}

export default ChartComponent;
