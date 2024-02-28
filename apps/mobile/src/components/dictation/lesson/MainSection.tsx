import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { COLORS, SIZES, SHADOWS, FONT } from '@mobile/constants';
import Typography from '@mobile/components/Typography';
import TopSection from './TopSection';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AudioSlider from '../AudioSlider';
import {
  checkInputValue,
  sliceSentence,
  splitSentence,
} from '@mobile/utils/common';
import { Button } from 'react-native-elements';
export interface SentenceChecking {
  isCorrect: boolean;
  correctWord: string;
  incorrectWord: string;
  characterPosition: number;
  correctWordOccurrence: number;
  incorrectWordOccurrence: number;
}

export interface HighlightingWord {
  word: string;
  iPosition: number;
  iCharacter: number;
}

type Props = {
  sentenceCorrect: string;
};

const MainContent: FC<Props> = ({ sentenceCorrect: sentence }) => {
  const [typingInput, setTypingInput] = useState<string>('');
  const [sentenceChecking, setSentenceChecking] =
    useState<SentenceChecking | null>(null);
  const [highlightingWord, setHighlightingWord] =
    useState<HighlightingWord | null>(null);
  const [inputCursor, setInputCursor] = useState<number | null>(null);
  const [selection, setSelection] = useState<{ start: number; end: number }>({
    start: 0,
    end: 0,
  });
  const inputRef = useRef<TextInput | null>(null);
  console.log({ sentence });

  const htmlContent = () => {
    if (!highlightingWord) return '';
    const wordIndexStart =
      highlightingWord &&
      highlightingWord.iPosition - highlightingWord.word.length;
    const wordIndexEnd = highlightingWord?.iPosition;
    console.log({
      word: highlightingWord.word,
      tail: typingInput.slice(wordIndexEnd),
    });
    const highlightingWordHtml = (
      <Typography style={styles.highlightingIncorrectWord}>
        {highlightingWord?.word}
      </Typography>
    );

    // return highlightingWordHtml;
    const headSentence = typingInput.slice(0, wordIndexStart);
    const tailSentence = typingInput.slice(wordIndexEnd);

    return (
      <Typography style={styles.highlightingWrapper}>
        {/* <Typography ></Typography> */}
        {htmlContent()}
      </Typography>
    );
    return `${headSentence}${highlightingWordHtml}${tailSentence}`;
  };

  useEffect(() => {
    if (sentenceChecking !== null && sentenceChecking.isCorrect === false) {
      inputRef?.current?.focus();
      setSelection({ start: inputCursor, end: inputCursor });
    }

    if (sentenceChecking?.isCorrect === true) {
      inputRef.current?.blur();
    }
  }, [sentenceChecking]);

  const handleCheckInput = (value: string) => {
    const sentenceChecking = checkInputValue(value, sentence);
    setSentenceChecking(sentenceChecking);

    const { isCorrect, correctWord, incorrectWord, characterPosition } =
      sentenceChecking;
    if (isCorrect === true) {
      setTypingInput(sentence);
      return;
    }
    if (!correctWord && !incorrectWord && !isCorrect) return;

    const {
      firstPhrase,
      secondPhrase,
      cursorIndex: missingWordCursor,
    } = splitSentence(sentenceChecking, sentence);

    let restPhrase = '';
    let incorrectWordCursor;
    if (incorrectWord) {
      const { phrase, cursorIndex } = sliceSentence(
        sentenceChecking,
        typingInput
      );
      restPhrase = phrase;
      incorrectWordCursor = cursorIndex;
    }
    const sanitizePhrase = restPhrase
      .replace(/[^\w\s%]/g, '')
      .replace(/\s\s+/g, ' ')
      .trim();
    const sanitizeSecondPhrase = secondPhrase
      .replace(/[^\w\s%]/g, '')
      .replace(/\s\s+/g, ' ')
      .trim();

    const phraseToSearch = new RegExp(`\\b${sanitizePhrase}\\b`);
    const isContainsPhrase =
      phraseToSearch.test(sanitizeSecondPhrase) && restPhrase.length > 0;
    const newTypingInput = isContainsPhrase
      ? `${firstPhrase} ${restPhrase}`
      : `${firstPhrase}${restPhrase}`;
    const cursor = isContainsPhrase
      ? missingWordCursor
      : incorrectWordCursor
      ? incorrectWordCursor
      : missingWordCursor;

    const highlightingWord =
      !isContainsPhrase && incorrectWordCursor
        ? {
            word: incorrectWord,
            iPosition: incorrectWordCursor,
            iCharacter: characterPosition,
          }
        : null;

    console.log({ missingWordCursor, incorrectWordCursor });
    setTypingInput(newTypingInput);
    setHighlightingWord(highlightingWord);
    setInputCursor(cursor);
  };
  console.log({ htmlContent: htmlContent() });
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Icon name="arrow-left" style={styles.icon} size={26} />
          <Typography style={styles.title}>1 / 21</Typography>
          <Icon name="arrow-right" style={styles.icon} size={26} />
        </View>
        <AudioSlider />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={typingInput}
            selection={sentenceChecking ? selection : null}
            onChangeText={(text) => {
              setTypingInput(text);
              setHighlightingWord(null);
              setSentenceChecking(null);
            }}
            onSelectionChange={() => {
              setHighlightingWord(null);
              setSentenceChecking(null);
            }}
            ref={inputRef}
          />
          {highlightingWord && (
            <Typography style={styles.highlightingWrapper}>
              {/* <Typography ></Typography> */}
              {htmlContent()}
            </Typography>
          )}
        </View>
        <Button title="submit" onPress={() => handleCheckInput(typingInput)} />
      </View>
    </>
  );
};

export default MainContent;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // ...SHADOWS.medium,
    // shadowColor: COLORS.white,
    borderRadius: SIZES.medium,
  },
  headerContainer: {
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
  },
  icon: {},
  inputContainer: {
    position: 'relative',
  },
  input: {
    minHeight: 40,
    // margin: 12,
    borderWidth: 1,
    padding: 10,
    position: 'relative',
    zIndex: 1,
  },
  highlightingIncorrectWord: {
    borderBottomWidth: 4,
    borderBottomColor: '#d35400',
    borderStyle: 'solid',
    // fontSize: SIZES.xxLarge,
  },
  highlightingWrapper: {
    color: '#fff',
    right: 0,
    left: 0,
    backgroundColor: '#8e44ad',
    // height: 100,
    position: 'absolute',
    top: 0,
    padding: 10,
    height: '100%',
    paddingLeft: 9.8,
    paddingTop: 16.5,
    // paddingRight: 10,
    // paddingLeft: 10,
    // paddingTop: 16.5,
    // paddingBottom: 16.5,
    // fontSize: 16,
  },
});
