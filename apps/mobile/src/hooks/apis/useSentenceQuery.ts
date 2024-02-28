import { HttpClient } from '@mobile/api/httpclient';
import { QueryKeys } from '@mobile/hooks/apis/queryKeys';
import { useQuery } from '@tanstack/react-query';

const fetchSentence = async () => {
  return HttpClient.get('dictation/sentence', {
    params: {
      lessonId: 3,
      audioKey: 'audio_file/oSY-INHhqVdm7_V_0NfqAA.mp3',
    },
  });
};

export const useSentenceQuery = () => {
  return useQuery({
    queryKey: [QueryKeys.sentenceLesson],
    queryFn: () => fetchSentence(),
  });
};
