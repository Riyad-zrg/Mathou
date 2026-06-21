import { useState, useEffect } from "react";
import AnswersGroup from "../AnswersGroup";
import QuestionStatement from "../QuestionStatement";
import { Button } from "../../button";
import Header from "../Header";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

export default function QuestionScreen() {
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
  };

  const fraction1 = "\\frac{" + numerateur1 + "}{" + denominateur1 + "}";
  const fraction2 = "\\frac{" + numerateur2 + "}{" + denominateur2 + "}";

  return (
    <div className="h-screen flex flex-col justify-evenly items-center text-center questionScreen">
      <Header />
      <section className="flex-1 w-full p-5 flex-col">
        <QuestionStatement
          operation={
            <p>
              <InlineMath math={fraction1} /> + <InlineMath math={fraction2} />{" "}
              = ?
            </p>
          }
        />
      </section>
      <section className="flex-9 w-full p-5 flex-col">
        <AnswersGroup
          hasUserAnswered={hasUserAnswered}
          setHasUserAnswered={(boolean) => setHasUserAnswered(boolean)}
          result={numerateur1 / denominateur1 + numerateur2 / denominateur2}
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
