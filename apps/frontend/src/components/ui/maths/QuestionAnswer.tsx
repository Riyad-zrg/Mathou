import { useEffect, useState } from "react";
import { Card, CardContent } from "../card";

interface QuestionAnswerProps {
  value: number;
  isCorrectAnswer: boolean;
  handleClickOnAnswer: () => void;
  hasUserAnswered: boolean;
}
export default function QuestionAnswer({
  value,
  isCorrectAnswer,
  handleClickOnAnswer,
  hasUserAnswered,
}: QuestionAnswerProps) {
  const [hasBeenChosen, setHasBeenChosen] = useState(false);
  useEffect(() => {
    if (!hasUserAnswered) {
      setHasBeenChosen(false);
    }
  }, [hasUserAnswered]);
  if (hasUserAnswered && isCorrectAnswer) {
    return (
      <Card
        className="flex-1 h-full w-full max-w-sm bg-green-400 justify-center"
        onClick={handleClickOnAnswer}
      >
        <CardContent className="text-4xl font-normal">{value}</CardContent>
      </Card>
    );
  }
  if (hasBeenChosen && !isCorrectAnswer) {
    return (
      <Card
        className="flex-1 h-full w-full max-w-sm bg-red-500 justify-center"
        onClick={handleClickOnAnswer}
      >
        <CardContent className="text-4xl font-normal">{value}</CardContent>
      </Card>
    );
  }
  return (
    <Card
      className="flex-1 h-full w-full max-w-sm justify-center"
      onClick={() => {
        handleClickOnAnswer();
        setHasBeenChosen(true);
      }}
    >
      <CardContent className="text-4xl font-normal">{value}</CardContent>
    </Card>
  );
}
