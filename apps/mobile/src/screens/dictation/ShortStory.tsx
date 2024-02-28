import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import LessonCard from '@mobile/components/dictation/LessonCard';
import { useShortStoryLessonsQuery } from '@mobile/hooks/apis/useLessonQuery';
import { UseQueryResult } from '@tanstack/react-query';
import Typography from '@mobile/components/Typography';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@mobile/app/App';

interface LessonInformation {
  id: number;
  name: string;
  type: number;
}
type Props = NativeStackScreenProps<RootStackParamList, 'ShortStory'>;

const ShortStory: FC<Props> = ({ navigation }) => {
  const response = useShortStoryLessonsQuery();
  const shortStoryLessons = response.data as LessonInformation[];
  console.log({ shortStoryLessons });

  const handlePress = () => {
    navigation.navigate('DetailLesson');
  };

  if (response.isLoading) return <Typography>lessons loading...</Typography>;
  return (
    response.isFetched &&
    response.isSuccess && (
      <SafeAreaView style={styles.container}>
        {shortStoryLessons.map((lesson) => {
          return (
            <LessonCard
              name={lesson.name}
              type={1}
              key={lesson.id}
              onPress={handlePress}
            />
          );
        })}
      </SafeAreaView>
    )
  );
};

export default ShortStory;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 8,
    paddingBottom: 70,
  },
});
