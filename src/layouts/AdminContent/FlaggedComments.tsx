import { useInfiniteQuery } from '@tanstack/react-query';
import { Flex, Spinner, Text, Stack, Icon } from '@chakra-ui/react';
import { FaFlag } from 'react-icons/fa';
import InfiniteScroll from 'react-infinite-scroll-component';
import commentReportsService from '../../services/commentReportsService';
import ServerError from '../../components/MainPage/ServerError';
import Ticket from '../../components/Ticket/TicketPreview';
const FlaggedComments = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
      ['flagged-comments', 'PENDING'],
      commentReportsService.gatherCommentReports,
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor ?? undefined;
        },
      }
    );

  if (isLoading) {
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
          Just a moment! We're gathering all the latest reports...
        </Text>
      </Flex>
    );
  }

  if (isError) {
    return <ServerError />;
  }

  return (
    <Flex align="center" justify="center">
      <Stack spacing={8} mx={'auto'} width={'100%'} maxW={'5xl'} py={12} px={6}>
        <InfiniteScroll
          dataLength={data?.pages?.length || 0}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader={
            <Stack align="center" justify="center" width="100%" py={4}>
              <Spinner size="md" />
            </Stack>
          }
        >
          <Stack spacing={4} align="center" justify="center">
            {data.pages.length > 0 &&
            data.pages.some((page) => page.reports.length > 0) ? (
              data.pages.map((page) =>
                page.reports.map((report) => (
                  <Ticket
                    key={report.id}
                    type="comment"
                    id={report.id}
                    reportedItemId={report.comment.id}
                    reason={report.reason}
                    status={report.status}
                    reporter={report.user.username}
                  />
                ))
              )
            ) : (
              <Flex
                direction="column"
                align="center"
                justify="center"
                gap={3}
                py={6}
              >
                <Icon as={FaFlag} boxSize={8} color="gray.500" />
                <Text fontSize="md" fontWeight="medium" color="gray.300">
                  No flagged comments yet. Everything looks clean!
                </Text>
              </Flex>
            )}
          </Stack>
        </InfiniteScroll>
      </Stack>
    </Flex>
  );
};

export default FlaggedComments;
