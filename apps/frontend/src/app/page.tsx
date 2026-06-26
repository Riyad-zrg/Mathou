import {
  Diff,
  Equal,
  Parentheses,
  Plus,
  SquareDivide,
  Calculator,
  Grid2x2,
} from "lucide-react";
import HomeCard from "../components/ui/hubpage/HomeCard";
import Header from "../components/ui/global/Header";

export default async function Home() {
  return (
    <div className="flex flex-1 flex-col h-screen">
      <Header />
      <section className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 grow p-5 gap-5 justify-center">
        <HomeCard
          icon={<Plus size={60} />}
          label={"Additions"}
          link={"/maths/addition"}
        />
        <HomeCard
          icon={<SquareDivide size={60} />}
          label={"Fractions"}
          link={"/maths/fraction"}
        />
        <HomeCard
          icon={<Diff size={60} />}
          label={"Priorités"}
          link={"/maths/priorities"}
        />
        <HomeCard
          icon={<Parentheses size={60} />}
          label={"Dérivations"}
          link={"/maths/derivation"}
        />
        <HomeCard
          icon={<Equal size={60} />}
          label={"Équations"}
          link={"/maths/equation"}
        />
        <HomeCard
          icon={<Calculator size={60} />}
          label={"Factorisations"}
          link={"/maths/factorization"}
        />
        <HomeCard
          icon={<Grid2x2 size={60} />}
          label={"Proportionnalité"}
          link={"/maths/proportionality"}
        />
      </section>

      <section className="flex flex-1 grow-0 bg-purple-500 justify-center p-3 header">
        <p className="text-white text-xs font-light font-sans">
          © 2026 SOCATOA, Tous droits réservés
        </p>
      </section>
    </div>
  );
}
