import { Item, ItemContent, ItemTitle } from "../../item";

interface ProportionalityStatementProps {
  problemObject: any;
  number1: number;
  number2: number;
  number3: number;
}

export default function ProportionalityStatement({
  problemObject,
  number1,
  number2,
  number3,
}: ProportionalityStatementProps) {
  return (
    <div className="questionStatement">
      <Item variant="outline_full_h">
        <ItemContent>
          <ItemTitle className="text-start md:text-center text-sm md:text-3xl sm:pb-2 md:pb-7 font-normal">
            {problemObject.enonce}
          </ItemTitle>
          <section className="w-full pb-5">
            <table className="border-5 w-full text-3xl">
              <tbody>
                <tr className="border-2">
                  <td className="border w-150 p-2 text-sm md:text-2xl">
                    {problemObject.valeur1}
                  </td>
                  <td className="border text-sm md:text-2xl p-2">{number1}</td>
                  <td className="border text-sm md:text-2xl p-2">{number3}</td>
                </tr>
                <tr className="border text-sm md:text-2xl">
                  <td className="border p-2 text-sm md:text-2xl">
                    {problemObject.valeur2}
                  </td>
                  <td className="border text-sm md:text-2xl">{number2}</td>
                  <td className="border font-black text-red-500 text-sm md:text-2xl">
                    ?
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </ItemContent>
      </Item>
    </div>
  );
}
