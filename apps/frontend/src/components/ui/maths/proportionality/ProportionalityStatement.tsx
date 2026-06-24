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
          <ItemTitle className="text-3xl pb-7 font-normal">
            {problemObject.enonce}
          </ItemTitle>
          <section className="w-full pb-5">
            <table className="border-5 w-full text-3xl">
              <tbody>
                <tr className="border-2">
                  <td className="border w-150 p-2 ">{problemObject.valeur1}</td>
                  <td className="border">{number1}</td>
                  <td className="border">{number3}</td>
                </tr>
                <tr className="border ">
                  <td className="border p-2">{problemObject.valeur2}</td>
                  <td className="border">{number2}</td>
                  <td className="border font-black text-red-500">?</td>
                </tr>
              </tbody>
            </table>
          </section>
        </ItemContent>
      </Item>
    </div>
  );
}
