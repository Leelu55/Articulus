const MAX_LENGTH = 5;

export default function extractArticle(voiceResultArray): string | null {
  const filteredVoiceResults = voiceResultArray.filter(
    (resultString: string) => {
      return resultString.split(' ').length <= MAX_LENGTH;
    },
  );
  if (filteredVoiceResults.length === 0) {
    return null;
  }

  for (const answer of filteredVoiceResults) {
    for (const word of answer.split(' ').reverse()) {
      if (['der', 'die', 'das'].includes(word)) {
        return word;
      }
    }
  }
  return null;
}
