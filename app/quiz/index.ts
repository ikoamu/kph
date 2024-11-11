import type { Track } from "../api/spotify";

type QuizOption = {
  text: string;
  isCorrect: boolean;
};

export type Quiz = {
  options: QuizOption[];
  answer: Track;
};

export function createQuiz(tracks: Track[]): Quiz[] {
  const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);
  const quizzes: Quiz[] = [];
  for (let i = 0; i < shuffledTracks.length; i += 4) {
    if (i + 3 >= shuffledTracks.length) break;
    const correctTrack = shuffledTracks[i];
    const options = [
      { text: correctTrack.name, isCorrect: true },
      { text: shuffledTracks[i + 1].name, isCorrect: false },
      { text: shuffledTracks[i + 2].name, isCorrect: false },
      { text: shuffledTracks[i + 3].name, isCorrect: false },
    ].sort(() => Math.random() - 0.5);
    quizzes.push({ options, answer: correctTrack });
  }
  return quizzes;
}
