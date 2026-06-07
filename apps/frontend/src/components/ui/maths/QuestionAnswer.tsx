import { useState } from "react";
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
  if (hasUserAnswered && isCorrectAnswer) {
    return (
      <Card
        className="w-full max-w-sm bg-green-400"
        onClick={handleClickOnAnswer}
      >
        <CardContent>{value}</CardContent>
      </Card>
    );
  }
  if (hasBeenChosen && !isCorrectAnswer) {
    return (
      <Card
        className="w-full max-w-sm bg-red-500"
        onClick={handleClickOnAnswer}
      >
        <CardContent>{value}</CardContent>
      </Card>
    );
  }
  return (
    <Card
      className="w-full max-w-sm"
      onClick={() => {
        handleClickOnAnswer();
        setHasBeenChosen(true);
      }}
    >
      <CardContent>{value}</CardContent>
    </Card>
  );
}
