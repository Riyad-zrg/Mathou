import Link from "next/link";
import { Card, CardHeader, CardContent, CardFooter } from "../card";

interface HomeCard {
  icon: any;
  label: string;
  link: string;
}
export default function HomeCard({ icon, label, link }: HomeCard) {
  return (
    <Link href={link}>
      <Card className="bg-orange-500  pb-12 m-1 hover:bg-orange-600 hover:m-0 active:bg-orange-800 active:m-2 text-white homeCard gap-8">
        <CardHeader></CardHeader>
        <CardContent className="flex justify-center">{icon}</CardContent>
        <CardFooter className="flex-col gap-2 md:text-2xl font-semibold text-center">
          {label}
        </CardFooter>
      </Card>
    </Link>
  );
}
