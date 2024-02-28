import { HttpClient } from '@mobile/api/httpclient';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@mobile/hooks/apis/queryKeys';

const fetchShortStoryLessons = async () => {
  return HttpClient.get('/dictation/short-stories');
};

export const useShortStoryLessonsQuery = () => {
  return useQuery({
    queryKey: [QueryKeys.shortStoryLessons],
    queryFn: () => fetchShortStoryLessons(),
  });
};
