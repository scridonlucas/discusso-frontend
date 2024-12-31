import { Box, Flex, Spinner, Icon, Text } from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';
import PieChart from '../DataChart/PieChart';
import { ChartData, ChartOptions } from 'chart.js';

export interface CommunityWithDiscussionCounts {
  id: number;
  name: string;
  _count: {
    discussions: number;
  };
}

interface CommunityDiscussionsChartProps {
  isLoading: boolean;
  isError: boolean;
  data: CommunityWithDiscussionCounts[] | undefined;
}

const CommunityDiscussionsChart: React.FC<CommunityDiscussionsChartProps> = ({
  isLoading,
  isError,
  data,
}) => {
  const pieChartData: ChartData<'pie'> | null = data
    ? {
        labels: data.map((community) => community.name),
        datasets: [
          {
            label: 'Discussions per Community',
            data: data.map((community) => community._count.discussions),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
            ],
            hoverBackgroundColor: [
              '#FF6384AA',
              '#36A2EBAA',
              '#FFCE56AA',
              '#4BC0C0AA',
              '#9966FFAA',
              '#FF9F40AA',
            ],
            hoverOffset: 6,
          },
        ],
      }
    : null;

  const pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff',
          boxWidth: 15,
          padding: 15,
        },
      },
      title: {
        display: true,
        text: 'Discussions per Community',
        color: '#fff',
        font: {
          size: 18,
        },
        padding: {
          top: 5,
          bottom: 25,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ${context.raw as number} Discussions`,
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
      border="1px solid"
      borderColor="gray.700"
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
      {pieChartData && (
        <PieChart data={pieChartData} options={pieChartOptions} />
      )}
    </Box>
  );
};

export default CommunityDiscussionsChart;
