import React from 'react'
import {
  Card,
  CardBody,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
const chartConfig = {
  type: "bar",
  height: 230,
  series: [
    {
      name: "Patient",
      data: [20, 70, 80, 32, 50, 35, 5, 23, 100],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: true,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#2CAFFE"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 2,
      },
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};

function Graph() {
  return (
    <div className='bg-white ml-6 lg:ml-2 me-6 lg:me-8 mt-4 h-56 rounded-lg'>
      <div className="h-full w-full">
        <h1 className='text-xs pt-2 pl-4 font-semibold'>No of patients </h1>
        <Card>
          <CardBody className="mt-0 px-2 pb-2 pt-0">
            <Chart {...chartConfig} />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Graph
