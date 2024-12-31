import { Box, Flex, Spinner, Icon, Text } from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';
import BarChart from '../DataChart/BarChart';
import { ChartData } from 'chart.js';
import { MostPopularUser } from '../../types/userTypes';
import { ChartOptions } from 'chart.js';
interface MostPopularUsersChartProps {
  isLoading: boolean;
  isError: boolean;
  data: MostPopularUser[] | undefined;
}

const MostPopularUsersChart: React.FC<MostPopularUsersChartProps> = ({
  isLoading,
  isError,
  data,
}) => {
  const colorPalette = [
    '#FF7F50',
    '#4682B4',
    '#FFDAB9',
    '#BA55D3',
    '#FFFF99',
    '#FF4500',
    '#5F9EA0',
    '#FFC0CB',
  ];

  const chartData: ChartData<'bar'> | null = data
    ? {
        labels: data.map((user) => user.username),
        datasets: [
          {
            label: 'Followers',
            data: data.map((user) => user._count.followers),
            backgroundColor: data.map(
              (_, index) => colorPalette[index % colorPalette.length]
            ),
            hoverBackgroundColor: data.map(
              (_, index) => `${colorPalette[index % colorPalette.length]}AA`
            ),
          },
        ],
      }
    : null;

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#fff',
        },
      },
      title: {
        display: true,
        text: 'Most Popular Users',
        color: '#fff',
        font: {
          size: 18,
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} followers`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,

        ticks: {
          color: '#fff',
        },
      },
      y: {
        ticks: {
          color: '#fff',
        },
      },
    },
  };

  return (
    <Box
      height={['300px', '400px', '400px']}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="md"
      border={'1px solid'}
      borderColor={'gray.700'}
      p={4}
    >
      {isLoading && <Spinner />}
      {isError && (
        <Flex align="center" justify="center" direction="column">
          <Text>Error loading chart data</Text>
          <Icon as={FiAlertTriangle} />
        </Flex>
      )}
      {chartData && <BarChart data={chartData} options={chartOptions} />}
    </Box>
  );
};

export default MostPopularUsersChart;
