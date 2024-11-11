import { useState } from 'hono/jsx'
import type { Quiz } from '../quiz'

export default function Q(props: { quizList: Quiz[] }) {
  const [index, setIndex] = useState(0)
  const quiz = props.quizList[index]
  return (
    <div>
      <h2>Question {index + 1}</h2>
      <audio controls src={quiz.answer.preview_url} />
      {quiz.options.map((option) => (
        <button>{option.text}</button>
      ))}
    </div>
  )
}
