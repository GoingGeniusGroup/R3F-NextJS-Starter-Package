
import CardFlip from "@/components/card/flipCard";

export default function Home() {
  return (
    <main className="size-full">
      <div className="flex w-full flex-row items-center justify-center gap-10">
        <video
        autoPlay
        muted
        loop
        className="absolute left-0 top-[-320px]  z-[1] size-full rotate-180 object-cover "
      >
        <source src="/bg/blackhole.webm" type="video/webm" />
        </video>
        <div className="z-[2]">
        <CardFlip />
        </div>
        <div className="z-[2]">
        <CardFlip />
        </div>
        <div className="z-[2]">
        <CardFlip />
        </div>
      </div>
    </main>
  );
}