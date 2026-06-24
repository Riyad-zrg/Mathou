import { useState, useEffect } from "react";
import { Button } from "../../button";
import Header from "../Header";
import "katex/dist/katex.min.css";
import ProportionalityAnswersGroup from "./ProportionalityAnswersGroup";
import ProportionalityStatement from "./ProportionalityStatement";
import { randomIntFromInterval } from "@/src/lib/utils";

export default function ProportionalityScreen() {
  const [number1, setNumber1] = useState(randomIntFromInterval(1, 10));
  const [number2, setNumber2] = useState(randomIntFromInterval(1, 10));
  const [number3, setNumber3] = useState(randomIntFromInterval(1, 10));
  const [isMounted, setIsMounted] = useState(false);
  const [hasUserAnswered, setHasUserAnswered] = useState<boolean>(false);
  const [problemObject, setProblemObject] = useState<object | null>(null);

  const problemes = [
    {
      enonce: `Pour faire ses confitures, Elisabeth a acheté ${number1} kg de sucre pour ${number2} €. Calculer le prix de ${number3} kg de sucre.`,
      valeur1: "Quantité de sucre (kg)",
      valeur2: "Prix (€)",
    },
    {
      enonce: `Pour préparer une fête, Lucas a acheté ${number1} litres de jus de fruits pour ${number2} €. Calculer le prix de ${number3} litres de jus de fruits.`,
      valeur1: "Quantité de jus (L)",
      valeur2: "Prix (€)",
    },
    {
      enonce: `Au marché, Sophie a acheté ${number1} kg de pommes pour ${number2} €. Calculer le prix de ${number3} kg de pommes.`,
      valeur1: "Masse de pommes (kg)",
      valeur2: "Prix (€)",
    },
    {
      enonce: `Pour son élevage, Marc a acheté ${number1} sacs de nourriture pour animaux pour ${number2} €. Calculer le prix de ${number3} sacs de nourriture.`,
      valeur1: "Nombre de sacs",
      valeur2: "Prix (€)",
    },
    {
      enonce: `Dans une papeterie, Emma a acheté ${number1} cahiers pour ${number2} €. Calculer le prix de ${number3} cahiers.`,
      valeur1: "Nombre de cahiers",
      valeur2: "Prix (€)",
    },
    {
      enonce: `Pour ses travaux, Julien a acheté ${number1} pots de peinture pour ${number2} €. Calculer le prix de ${number3} pots de peinture.`,
      valeur1: "Nombre de pots",
      valeur2: "Prix (€)",
    },
    {
      enonce: `À la boulangerie, Clara a acheté ${number1} baguettes pour ${number2} €. Calculer le prix de ${number3} baguettes.`,
      valeur1: "Nombre de baguettes",
      valeur2: "Prix (€)",
    },
    {
      enonce: `Pour décorer une salle, Thomas a acheté ${number1} mètres de ruban pour ${number2} €. Calculer le prix de ${number3} mètres de ruban.`,
      valeur1: "Longueur de ruban (m)",
      valeur2: "Prix (€)",
    },
    {
      enonce: `Dans une librairie, Léa a acheté ${number1} livres pour ${number2} €. Calculer le prix de ${number3} livres.`,
      valeur1: "Nombre de livres",
      valeur2: "Prix (€)",
    },
    {
      enonce: `Pour son jardin, Antoine a acheté ${number1} kg d'engrais pour ${number2} €. Calculer le prix de ${number3} kg d'engrais.`,
      valeur1: "Masse d'engrais (kg)",
      valeur2: "Prix (€)",
    },
    {
      enonce: `Dans un magasin de bricolage, Camille a acheté ${number1} planches de bois pour ${number2} €. Calculer le prix de ${number3} planches de bois.`,
      valeur1: "Nombre de planches",
      valeur2: "Prix (€)",
    },
    {
      enonce: `Pour une recette, Nora a acheté ${number1} kg de farine pour ${number2} €. Calculer le prix de ${number3} kg de farine.`,
      valeur1: "Masse de farine (kg)",
      valeur2: "Prix (€)",
    },
    {
      enonce: `Dans une animalerie, Hugo a acheté ${number1} boîtes de pâtée pour ${number2} €. Calculer le prix de ${number3} boîtes de pâtée.`,
      valeur1: "Nombre de boîtes",
      valeur2: "Prix (€)",
    },
    {
      enonce: `Pour organiser un pique-nique, Chloé a acheté ${number1} paquets de chips pour ${number2} €. Calculer le prix de ${number3} paquets de chips.`,
      valeur1: "Nombre de paquets",
      valeur2: "Prix (€)",
    },
    {
      enonce: `Dans une jardinerie, Paul a acheté ${number1} plants de tomates pour ${number2} €. Calculer le prix de ${number3} plants de tomates.`,
      valeur1: "Nombre de plants",
      valeur2: "Prix (€)",
    },
  ];

  useEffect(() => {
    const problemObject =
      problemes[Math.floor(Math.random() * problemes.length)];
    setProblemObject(problemObject);

    setIsMounted(true);
  }, [number1, number2, number3]);

  if (!isMounted) {
    return null;
  }

  const onNextClick = () => {
    setHasUserAnswered(false);
    setNumber1(randomIntFromInterval(1, 10));
    setNumber2(randomIntFromInterval(1, 10));
    setNumber3(randomIntFromInterval(1, 10));
  };

  const getResult = () => {
    return (number2 * number3) / number1;
  };

  const generateRandomAnswer = () => {
    return (
      (randomIntFromInterval(1, 10) * randomIntFromInterval(1, 10)) /
      randomIntFromInterval(1, 10)
    );
  };

  return (
    <div className="h-screen flex flex-col justify-evenly items-center text-center questionScreen">
      <Header />
      <section className="flex-1 w-full p-5 flex-col">
        <ProportionalityStatement
          problemObject={problemObject}
          number1={number1}
          number2={number2}
          number3={number3}
        />
      </section>
      <section className="flex-9 w-full p-5 flex-col">
        <ProportionalityAnswersGroup
          hasUserAnswered={hasUserAnswered}
          setHasUserAnswered={(boolean) => setHasUserAnswered(boolean)}
          result={getResult()}
          generateRandom={generateRandomAnswer}
        />
      </section>
      <div className="flex-2">
        <section className="text-center">
          <Button
            onClick={onNextClick}
            size={"xl"}
            className={
              "text-lg lg:text-3xl " + (!hasUserAnswered ? "hidden" : "")
            }
          >
            Suivant
          </Button>
        </section>
      </div>
    </div>
  );
}
