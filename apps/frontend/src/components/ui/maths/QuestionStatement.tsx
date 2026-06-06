import { useEffect, useState } from "react";
import { Item, ItemContent, ItemTitle } from "../item";

export default function Question() {
  const [number1, setNumber1] = useState(Math.floor(Math.random() * 100));
  const [number2, setNumber2] = useState(Math.floor(Math.random() * 100));
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="p-5">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>
            {number1} + {number2} ?
          </ItemTitle>
        </ItemContent>
      </Item>
    </div>
  );
}
