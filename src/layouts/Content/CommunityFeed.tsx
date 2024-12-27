import { Flex, Text, Spinner, Box } from '@chakra-ui/react';
import SortingBar from '../../components/SortingBar/SortingBar';
import communityService from '../../services/communityService';
import DiscussionSection from '../../components/DiscussionSection/DiscussionSection';
import { useQuery } from '@tanstack/react-query';

import LayoutTitle from '../../components/LayoutTitle/LayoutTitle';
import ServerError from '../../components/MainPage/ServerError';
import { useParams, Navigate } from 'react-router-dom';
import { useState } from 'react';

const CommunityFeed: React.FC = () => {
  const [sortCriteria, setSortCriteria] = useState<string>('recent');
  const [timeFrame, setTimeFrame] = useState<string>('all');
  const [feedType, setFeedType] = useState<string>('explore');
  const [searchInput, setSearchInput] = useState<string>('');
  const [triggeredSearch, setTriggeredSearch] = useState<string>('');

  const { id: communityId } = useParams();

  const {
    data: communityData,
    isLoading: isCommunityLoading,
    isError: isCommunityError,
  } = useQuery(
    ['community', Number(communityId)!],
    communityService.getCommunityById,
    {
      enabled: !!communityId,
    }
  );

  if (isCommunityLoading) {
    return (
      <Flex
        align={'center'}
        flexDirection={'column'}
        gap={'3vh'}
        justify={'center'}
        alignItems={'center'}
        minH={'100vh'}
      >
        <Spinner size="xl" />
        <Text fontSize="xl" color="white">
          Just a moment! We're gathering all the latest discussions for you...
        </Text>
      </Flex>
    );
  }

  if (!communityId || isNaN(Number(communityId))) {
    return <Navigate to="/communities" />;
  }

  if (isCommunityError) {
    return <ServerError />;
  }

  const handleSortChange = (value: string | string[]) => {
    if (typeof value === 'string') {
      setSortCriteria(value);
    }
  };

  const handleTimeFrameChange = (value: string | string[]) => {
    if (typeof value === 'string') {
      setTimeFrame(value);
    }
  };

  const handleFeedTypeChange = (value: string | string[]) => {
    if (typeof value === 'string') {
      setFeedType(value);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    setTriggeredSearch(searchInput);
  };

  return (
    <Box>
      <SortingBar
        sortCriteria={sortCriteria}
        onSortChange={handleSortChange}
        timeFrame={timeFrame}
        onTimeFrameChange={handleTimeFrameChange}
        feedType={feedType}
        onFeedTypeChange={handleFeedTypeChange}
        searchInput={searchInput}
        onSearchInputChange={handleSearchInputChange}
        onSearchClick={handleSearchClick}
      />
      <Box mx="auto" px={4} py={8} maxWidth={'3xl'} width="100%">
        <Box mb={6}>
          <LayoutTitle title={communityData.name} mb={2} textAlign="start" />
        </Box>
        <DiscussionSection
          queryKey={[
            'discussions',
            Number(communityId)!,
            feedType,
            sortCriteria,
            timeFrame,
            false,
            triggeredSearch,
          ]}
        />
      </Box>
    </Box>
  );
};

export default CommunityFeed;
