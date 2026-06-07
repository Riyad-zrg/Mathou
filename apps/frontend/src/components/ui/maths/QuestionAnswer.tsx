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
  if (hasUserAnswered && isCorrectAnswer) {
    return (
      <Card
        className="w-full max-w-sm bg-green-300"
        onClick={handleClickOnAnswer}
      >
        <CardContent>{value}</CardContent>
      </Card>
    );
  }
  return (
    <Card className="w-full max-w-sm" onClick={handleClickOnAnswer}>
      <CardContent>{value}</CardContent>
    </Card>
  );
}
