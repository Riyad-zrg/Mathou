import { Item, ItemContent, ItemTitle } from "../../item";

interface DerivationStatementProps {
  operation: any;
}

export default function DerivationStatement({
  operation,
}: DerivationStatementProps) {
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
