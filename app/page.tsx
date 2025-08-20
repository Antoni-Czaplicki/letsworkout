import MainForm from "@/components/main-form";
import { ApiResponseHoliday } from "@/types/holiday";

export default async function Home() {
  const response = await fetch(
    "https://api.api-ninjas.com/v1/holidays?country=PL",
    {
      headers: {
        "X-Api-Key": process.env.NINJA_API_KEY || "",
      },
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch holidays: ${response.statusText}`);
  }
  const holidays = ((await response.json()) as ApiResponseHoliday[]).map(
    (holiday) => ({
      date: new Date(holiday.date),
      name: holiday.name,
      type: holiday.type,
    }),
  );

  return (
    <div className="grid min-h-screen grid-rows-[96px_1fr_96px] items-start justify-items-center sm:grid-rows-[120px_1fr_120px]">
      <main className="row-start-2 flex w-full flex-col items-center gap-4 px-6 sm:w-[426px] sm:items-start">
        <MainForm holidays={holidays} />
      </main>
    </div>
  );
}
