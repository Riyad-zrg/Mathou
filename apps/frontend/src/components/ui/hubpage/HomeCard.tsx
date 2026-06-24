import { Card, CardHeader, CardContent, CardFooter } from "../card";

interface HomeCard {
  icon: any;
  label: string;
}
export default function HomeCard({ icon, label }: HomeCard) {
  return (
    <Card className="bg-orange-500 m-1 hover:bg-orange-600 hover:m-0 active:bg-orange-800 active:m-2 text-white homeCard gap-8">
      <CardHeader></CardHeader>
      <CardContent className="flex justify-center pb-">{icon}</CardContent>
      <CardFooter className="flex-col gap-2 text-2xl font-semibold">
        {label}
      </CardFooter>
    </Card>
  );
}
