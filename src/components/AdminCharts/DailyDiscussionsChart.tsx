import { Box, Flex, Spinner, Icon, Text } from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';
import LineChart from '../DataChart/LineChart';
import { format } from 'date-fns';
import { ChartOptions } from 'chart.js';

interface DailyDiscussionsChartProps {
  isLoading: boolean;
  isError: boolean;
  data: { date: string; count: number }[] | undefined;
}

const DailyDiscussionsChart: React.FC<DailyDiscussionsChartProps> = ({
  isLoading,
  isError,
  data,
}) => {
  const discussionsChartData = data
    ? {
        labels: data.map((stat) => format(new Date(stat.date), 'MMM dd, y')),
        datasets: [
          {
            label: 'Daily Discussions',
            data: data.map((stat) => stat.count),
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            tension: 0.3,
          },
        ],
      }
    : null;

  const discussionsChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
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
        text: 'Daily Created Discussions',
        color: '#fff',
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `Discussions: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: '#444',
        },
        ticks: {
          color: '#fff',
        },
      },
      y: {
        grid: {
          color: '#444',
        },
        ticks: {
          color: '#fff',
        },
        beginAtZero: true,
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
      {isLoading && <Spinner color="blue.500" />}
      {isError && !data && (
        <Flex
          align="center"
          justify="center"
          height="100%"
          width="100%"
          direction="column"
        >
          <Text fontSize="xl" color="red.500" fontWeight="bold" mb={2}>
            Error loading chart data. Please try again later.
          </Text>
          <Icon as={FiAlertTriangle} w={12} h={12} color="red.500" mb={4} />
        </Flex>
      )}
      {discussionsChartData && (
        <LineChart
          data={discussionsChartData}
          options={discussionsChartOptions}
        />
      )}
    </Box>
  );
};

export default DailyDiscussionsChart;
