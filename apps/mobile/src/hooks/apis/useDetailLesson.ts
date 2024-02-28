import { HttpClient } from '@mobile/api/httpclient';
import { QueryFunction, useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@mobile/hooks/apis/queryKeys';

const fetchDetailLesson = async () => {
  return HttpClient.get(`dictation/${5}`, {
    params: { languageCode: 'vn' },
  });
};

export const useDetailLesson = () => {
  return useQuery({
    queryKey: [QueryKeys.detailLesson],
    queryFn: () => fetchDetailLesson(),
  });
};
