'use client'
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item"
import { randomInt } from "crypto";
import { useState } from "react";

export default function Home() {
  const [number1, setNumber1] = useState(Math.floor(Math.random() * 100));
  const [number2, setNumber2] = useState(Math.floor(Math.random() * 100));
  const [userAnswer, setUserAnswer] = useState('')

  const handleInputChange = async (event) => {
    await setUserAnswer(event?.target.value);

    if(parseInt(event?.target.value)===(number1+number2)){
        setNumber1(Math.floor(Math.random() * 100));
        setNumber2(Math.floor(Math.random() * 100));
        setUserAnswer('');
    }
  };
  console.log(userAnswer);
  return (
<Item>
  <ItemContent>
    <ItemTitle>{number1} + {number2} ?</ItemTitle>
    <Input value={userAnswer} onChange={handleInputChange}/>
  </ItemContent>
</Item>
  );
}
