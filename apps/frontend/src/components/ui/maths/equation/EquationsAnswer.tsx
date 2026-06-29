import { useEffect, useState } from "react";
import { Card, CardContent } from "../../card";

interface EquationAnswerProps {
  value: any;
  isCorrectAnswer: boolean;
  handleClickOnAnswer: () => void;
  hasUserAnswered: boolean;
}
export default function EquationAnswer({
  value,
  isCorrectAnswer,
  handleClickOnAnswer,
  hasUserAnswered,
}: EquationAnswerProps) {
  const [hasBeenChosen, setHasBeenChosen] = useState(false);
  useEffect(() => {
    if (!hasUserAnswered) {
      setHasBeenChosen(false);
    }
  }, [hasUserAnswered]);
  if (hasUserAnswered && isCorrectAnswer) {
    return (
      <Card
        className="flex-1 h-full w-full bg-green-400 justify-center"
        onClick={handleClickOnAnswer}
      >
        <CardContent className="text-xl md:text-4xl">{value}</CardContent>
      </Card>
    );
  }
  if (hasBeenChosen && !isCorrectAnswer) {
    return (
      <Card
        className="flex-1 h-full w-full bg-red-500 justify-center"
        onClick={handleClickOnAnswer}
      >
        <CardContent className="text-xl md:text-4xl">{value}</CardContent>
      </Card>
    );
  }
  return (
    <Card
      className="flex-1 h-full w-full justify-center"
      onClick={() => {
        if (!hasUserAnswered) {
          setHasBeenChosen(true);
        }
        handleClickOnAnswer();
      }}
    >
      <CardContent className="text-xl md:text-4xl">{value}</CardContent>
    </Card>
  );
}
