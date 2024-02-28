import { SentenceChecking } from '@client/components/youtube-exercise/YoutubeExercise';
import { AxiosRequestConfig } from 'axios';

export interface ConfigurationParameters {
  apiKey?:
    | string
    | Promise<string>
    | ((name: string) => string)
    | ((name: string) => Promise<string>);
  username?: string;
  password?: string;
  accessToken?:
    | string
    | Promise<string>
    | ((name?: string, scopes?: string[]) => string)
    | ((name?: string, scopes?: string[]) => Promise<string>);
  basePath?: string;
  baseOptions?: any;
  formDataCtor?: new () => any;
}

export class Configuration {
  /**
   * parameter for apiKey security
   * @param name security name
   * @memberof Configuration
   */
  apiKey?:
    | string
    | Promise<string>
    | ((name: string) => string)
    | ((name: string) => Promise<string>);
  /**
   * parameter for basic security
   *
   * @type {string}
   * @memberof Configuration
   */
  username?: string;
  /**
   * parameter for basic security
   *
   * @type {string}
   * @memberof Configuration
   */
  password?: string;
  /**
   * parameter for oauth2 security
   * @param name security name
   * @param scopes oauth2 scope
   * @memberof Configuration
   */
  accessToken?:
    | string
    | Promise<string>
    | ((name?: string, scopes?: string[]) => string)
    | ((name?: string, scopes?: string[]) => Promise<string>);
  /**
   * override base path
   *
   * @type {string}
   * @memberof Configuration
   */
  basePath?: string;
  /**
   * base options for axios calls
   *
   * @type {any}
   * @memberof Configuration
   */
  baseOptions?: any;
  /**
   * The FormData constructor that will be used to create multipart form data
   * requests. You can inject this here so that execution environments that
   * do not support the FormData class can still run the generated client.
   *
   * @type {new () => FormData}
   */
  formDataCtor?: new () => any;

  constructor(param: ConfigurationParameters = {}) {
    this.apiKey = param.apiKey;
    this.username = param.username;
    this.password = param.password;
    this.accessToken = param.accessToken;
    this.basePath = param.basePath;
    this.baseOptions = param.baseOptions;
    this.formDataCtor = param.formDataCtor;
  }

  /**
   * Check if the given MIME is a JSON MIME.
   * JSON MIME examples:
   *   application/json
   *   application/json; charset=UTF8
   *   APPLICATION/JSON
   *   application/vnd.company+json
   * @param mime - MIME (Multipurpose Internet Mail Extensions)
   * @return True if the given MIME is JSON, false otherwise.
   */
  public isJsonMime(mime: string): boolean {
    const jsonMime: RegExp = new RegExp(
      '^(application/json|[^;/ \t]+/[^;/ \t]+[+]json)[ \t]*(;.*)?$',
      'i'
    );
    return (
      mime !== null &&
      (jsonMime.test(mime) ||
        mime.toLowerCase() === 'application/json-patch+json')
    );
  }
}

export const serializeDataIfNeeded = function (
  value: any,
  requestOptions: any,
  configuration?: Configuration
) {
  const nonString = typeof value !== 'string';
  const needsSerialization =
    nonString && configuration && configuration.isJsonMime
      ? configuration.isJsonMime(requestOptions.headers['Content-Type'])
      : nonString;
  return needsSerialization
    ? JSON.stringify(value !== undefined ? value : {})
    : value || '';
};

export const assertParamExists = function (
  functionName: string,
  paramName: string,
  paramValue: unknown
) {
  if (paramValue === null || paramValue === undefined) {
    throw new Error(
      paramName,
      `Required parameter ${paramName} was null or undefined when calling ${functionName}.`
    );
  }
};

export const checkInputValue = (
  value: string,
  correctSentence: string
): SentenceChecking => {
  if (!value) {
    return {
      isCorrect: false,
      correctWord: '',
      incorrectWord: '',
      characterPosition: 0,
      correctWordOccurrence: 0,
      incorrectWordOccurrence: 0,
    };
  }

  const wordsInput = value
    .trim()
    .replace(/[^\w\s%]/g, '')
    .split(' ')
    .filter(Boolean);
  const words = correctSentence
    .replace(/[^\w\s%]/g, '')
    .split(' ')
    .filter(Boolean);
  for (let iWord = 0; iWord < words.length; iWord++) {
    const word = words[iWord];
    const wordInput = wordsInput?.[iWord] || '';
    if (
      !wordInput ||
      wordInput.toLocaleLowerCase() !== word.toLocaleLowerCase()
    ) {
      for (let iCharacter = 0; iCharacter < word.length; iCharacter++) {
        const character = word[iCharacter];
        const inputCharacter = wordInput?.[iCharacter] || 0;
        if (!inputCharacter || inputCharacter !== character) {
          const correctWordOccurrence = words
            .slice(0, iWord + 1)
            .filter((w) => word === w).length;

          const incorrectWordOccurrence = wordsInput
            .slice(0, iWord + 1)
            .filter((w) => wordInput === w).length;

          return {
            isCorrect: false,
            correctWord: word,
            incorrectWord: wordInput,
            characterPosition: iCharacter,
            correctWordOccurrence,
            incorrectWordOccurrence,
          };
        }
      }
    }
  }
  return {
    isCorrect: true,
    correctWord: '',
    incorrectWord: '',
    characterPosition: -1,
    correctWordOccurrence: -1,
    incorrectWordOccurrence: -1,
  };
};

export const splitSentence = (
  sentenceChecking: SentenceChecking,
  correctSentence: string
) => {
  const { correctWord, correctWordOccurrence } = sentenceChecking;
  // if (isCorrect === true) return correctSentence;
  // if (!correctSentence) return '';
  let regex = new RegExp(`\\b${correctWord}\\b`);
  if (/%|\$/.test(correctSentence)) {
    regex = new RegExp(`\\b${correctWord}\\b|\\b${correctWord}\\B`);
  }
  if (correctSentence.search(regex) === -1)
    throw new Error('correctWord does not exist');

  const indexOf = getIndexOfWord(
    correctWord,
    correctSentence,
    regex,
    correctWordOccurrence
  );
  return {
    firstPhrase: correctSentence.slice(0, indexOf),
    secondPhrase: correctSentence.slice(indexOf),
    cursorIndex: indexOf,
  };
};

export const sliceSentence = (
  sentenceChecking: SentenceChecking,
  inputSentence: string
) => {
  const { isCorrect, incorrectWord, incorrectWordOccurrence } =
    sentenceChecking;
  // if (isCorrect === true) return inputSentence;
  // if (!incorrectWord) return '';
  let regex = new RegExp(`\\b${incorrectWord}\\b`);
  if (/%|\$/.test(inputSentence)) {
    regex = new RegExp(`\\b${incorrectWord}\\b|\\b${incorrectWord}\\B`);
  }
  if (inputSentence.search(regex) === -1)
    throw new Error('correctWord does not exist');

  const indexOf = getIndexOfWord(
    incorrectWord,
    inputSentence,
    regex,
    incorrectWordOccurrence
  );
  return {
    phrase: inputSentence.slice(indexOf),
    cursorIndex: indexOf + incorrectWord.length,
  };
};

const getIndexOfWord = (
  word: string,
  sentence: string,
  regex: RegExp,
  wordOccurrence: number
) => {
  if (!word) throw new Error('No word parameter');
  if (wordOccurrence === 1) return sentence.search(regex);

  let count = 1;
  let position = 0;
  while (count <= wordOccurrence) {
    const newSentence = sentence.slice(position);
    position +=
      newSentence.search(regex) + (count === wordOccurrence ? 0 : word.length);
    count++;
  }

  return position;
};
