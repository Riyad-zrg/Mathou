import { useState, useEffect } from "react";
import QuestionStatement from "../addition/QuestionStatement";
import { Button } from "../../button";
import Header from "../Header";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";
import FractionAnswersGroup from "./FractionAnswersGroup";

export default function QuestionScreen() {
  const listeOperateurs = ["-", "+", "x"];

  const [numerateur1, setNumerateur1] = useState(
    Math.floor(Math.random() * 100),
  );
  const [denominateur1, setDenominateur1] = useState(
    Math.floor(Math.random() * 100),
  );
  const [numerateur2, setNumerateur2] = useState(
    Math.floor(Math.random() * 100),
  );
  const [denominateur2, setDenominateur2] = useState(
    Math.floor(Math.random() * 100),
  );
  const [isMounted, setIsMounted] = useState(false);
  const [hasUserAnswered, setHasUserAnswered] = useState<boolean>(false);
  const [operateur, setOperateur] = useState(
    listeOperateurs[Math.floor(listeOperateurs.length * Math.random())],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onNextClick = () => {
    setHasUserAnswered(false);
    setNumerateur1(Math.floor(Math.random() * 100));
    setNumerateur2(Math.floor(Math.random() * 100));
    setDenominateur1(Math.floor(Math.random() * 100));
    setDenominateur2(Math.floor(Math.random() * 100));
    setOperateur(
      listeOperateurs[Math.floor(listeOperateurs.length * Math.random())],
    );
  };

  const fraction1 = "\\frac{" + numerateur1 + "}{" + denominateur1 + "}";
  const fraction2 = "\\frac{" + numerateur2 + "}{" + denominateur2 + "}";

  const getGcd = (a: number, b: number) => {
    let num = 2,
      res = 1;
    while (num <= Math.min(a, b)) {
      if (a % num === 0 && b % num === 0) {
        res = num;
      }
      num++;
    }
    return res;
  };

  const getResult = () => {
    let resNumerateur = 0;
    switch (operateur) {
      case "+":
        resNumerateur =
          numerateur1 * denominateur2 + numerateur2 * denominateur1;
        break;

      case "x":
        resNumerateur = numerateur1 * numerateur2;
        break;

      case "-":
        resNumerateur =
          numerateur1 * denominateur2 - numerateur2 * denominateur1;
        break;
    }

    let resDenominateur = denominateur1 * denominateur2;
    let gcd = getGcd(resNumerateur, resDenominateur);
    resNumerateur = resNumerateur / gcd;
    resDenominateur = resDenominateur / gcd;
    const result =
      "\\frac{" +
      resNumerateur.toString() +
      "}{" +
      resDenominateur.toString() +
      "}";

    return result;
  };

  const generateRandomAnswer = () => {
    let result = "";
    let resNumerateur =
      Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100) +
      Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100);
    let resDenominateur =
      Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100);
    const gcd = getGcd(resNumerateur, resDenominateur);
    resNumerateur = resNumerateur / gcd;
    resDenominateur = resDenominateur / gcd;
    result =
      "\\frac{" +
      resNumerateur.toString() +
      "}{" +
      resDenominateur.toString() +
      "}";
    return result;
  };

  return (
    <div className="h-screen flex flex-col justify-evenly items-center text-center questionScreen">
      <Header />
      <section className="flex-1 w-full p-5 flex-col">
        <QuestionStatement
          operation={
            <p>
              <InlineMath math={fraction1} /> {operateur}{" "}
              <InlineMath math={fraction2} /> = ?
            </p>
          }
        />
      </section>
      <section className="flex-9 w-full p-5 flex-col">
        <FractionAnswersGroup
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
