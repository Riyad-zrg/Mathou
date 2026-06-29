import { Item, ItemContent, ItemTitle } from "../../item";

interface FactorizationStatementProps {
  operation: any;
}

export default function FactorizationStatement({
  operation,
}: FactorizationStatementProps) {
  return (
    <div className="questionStatement">
      <Item variant="outline_full_h">
        <ItemContent>
          <ItemTitle className="text-2xl md:text-4xl">{operation}</ItemTitle>
        </ItemContent>
      </Item>
    </div>
  );
}
