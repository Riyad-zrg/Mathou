import { Card, CardContent } from "../card";

export default function QuestionAnswer({ value }: { value: number }) {
  return (
    <Card className="w-full max-w-sm">
      <CardContent>{value}</CardContent>
    </Card>
  );
}
