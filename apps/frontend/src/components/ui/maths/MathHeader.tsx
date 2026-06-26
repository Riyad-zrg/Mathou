import { Button } from "../button";

export default function MathHeader() {
  return (
    <div className="flex flex-1 font-medium justify-center lg:justify-start flex-row w-full h-full align-center bg-purple-500 header p-1 md:p-0">
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
