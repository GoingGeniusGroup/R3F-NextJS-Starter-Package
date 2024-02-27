import Avatar_creator from "@/components/avatar-creator/avatar";


export default function Home() {
  return (
    <main className="size-full">
      <div className="flex flex-col gap-20">
        <Avatar_creator />
      </div>
    </main>
  );
}