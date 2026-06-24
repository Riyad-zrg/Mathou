import { Card, CardHeader, CardContent, CardFooter } from "../card";

interface HomeCard {
  icon: any;
  label: string;
}
export default function HomeCard({ icon, label }: HomeCard) {
  return (
    <Card className="homeCard">
      <CardHeader></CardHeader>
      <CardContent className="flex justify-center">{icon}</CardContent>
      <CardFooter className="flex-col gap-2">{label}</CardFooter>
    </Card>
  );
}
