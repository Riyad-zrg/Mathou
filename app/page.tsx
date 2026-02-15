import prisma from "@/lib/prisma";

export default async function Home() {
  const problems = await prisma.problem.findMany()
  return (
    <div>
      <ul>
        {problems.map((problem) => (
          <li key={problem.id}>{problem.statement}</li>
        ))}
      </ul>
    </div>
  );
}
