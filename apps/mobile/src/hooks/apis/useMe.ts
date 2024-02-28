import { HttpClient } from '@mobile/api/httpclient';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@mobile/hooks/apis/queryKeys';

const fetchMe = async () => {
  return HttpClient.get('/auth/me');
};

export const useMe = () => {
  return useQuery({
    queryKey: [QueryKeys.me],
    queryFn: () => fetchMe(),
  });
};
