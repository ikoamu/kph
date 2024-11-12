import { useEffect, useRef, useState } from 'hono/jsx'
import type { Quiz } from '../quiz'

type QuizStatus = {
  quizIndex: number;
  correctCount: number;
  status: 'ready' | 'playing' | "answer" | 'gameover' | 'gameclear';
}

const initialStatus: QuizStatus = {
  quizIndex: 0,
  correctCount: 0,
  status: 'ready',
}

export default function Q({quizList}: { quizList: Quiz[] }) {
  const [status, setStatus] = useState(initialStatus)
  // const volumeRef = useRef<HTMLInputElement>(null)
  // const audioRef = useRef<HTMLAudioElement>(null)
  const quiz = quizList[status.quizIndex]
  const [count, setCount] = useState(0)


  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.volume = 0.1;
  //   }
  // }, [])


  return (
    <div>
        {status.status === 'ready' && (
        <button onClick={() => setStatus({ ...status, status: 'playing' })}>Start</button>
      )}
      {status.status === 'playing' && (<>
        <h1>Q. {status.quizIndex + 1}</h1>
        <audio src={quiz.answer.preview_url} controls />
        <ul>
          {quiz.options.map((choice, index) => (
            <li key={index}>
              <button onClick={() => {
                if (choice.isCorrect) {
                  setStatus({
                    ...status,
                    correctCount: status.correctCount + 1,
                    status: status.quizIndex + 1 === quizList.length ? 'gameclear' : 'answer',
                  })
                } else {
                  setStatus({
                    ...status,
                    status: 'gameover',
                  })
                }
              }}>{choice.text}</button>
            </li>
          ))}
        </ul>
        </>
      )}
      {
        status.status === 'answer' && (
          <div>
            <p>Correct!</p>
            <button onClick={() => setStatus({ ...status, status: 'playing', quizIndex: status.quizIndex + 1 })}>Next</button>
          </div>
        )
      }
      {status.status === 'gameover' && (
        <div>
          <p>Game Over</p>
          <p>{status.correctCount} / {quizList.length}</p>
          <button onClick={() => setStatus(initialStatus)}>Retry</button>
        </div>
      )}
      {status.status === 'gameclear' && (
        <div>
          <p>Correct: {status.correctCount}</p>
          <button onClick={() => setStatus(initialStatus)}>Retry</button>
        </div>
      )}
    </div>
  )
}
