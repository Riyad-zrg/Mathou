import { House } from "lucide-react";
import { Button } from "../button";
import { Item } from "../item";

export default function Header() {
  return (
    <div className="flex flex-1 font-medium justify-center lg:justify-start flex-row w-full h-full align-center bg-purple-500 header">
      <section className="p-3">
        <p className="bg-purple-700  text-white rounded-sm p-2 font-600">
          SOCATOA
        </p>
      </section>
      <section className="flex absolute w-full justify-end pr-3 self-center items-end">
        <a href="/">
          <Button
            className="flex self-center justify-center text-center"
            variant="outline"
            size="icon"
            aria-label="Submit"
          >
            <House />
          </Button>
        </a>
      </section>
    </div>
  );
}
