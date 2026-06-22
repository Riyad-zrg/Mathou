import { House } from "lucide-react";
import { Button } from "../button";
import { Item } from "../item";

export default function Header() {
  return (
    <div className="flex flex-1 font-medium justify-center lg:justify-start flex-row w-full h-full align-center bg-purple-500 header">
      <section className="flex absolute w-full justify-start pl-3 self-center items-end">
        <a href="/">
          <Button
            className="flex self-center justify-center text-center bg-purple-700 border-purple-900 border-3 text-white"
            variant="outline"
          >
            SOCATOA
          </Button>
        </a>
      </section>
    </div>
  );
}
