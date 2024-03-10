import Hero from "@/components/Hero/main/Hero";

import Skills from "@/components/Hero/main/Skills";

export default function Home() {
  return (
    <main className="size-full">
      <div className="flex flex-col gap-20">
        <Hero />
        {/* <Skills />
        <Encryption />
        <Projects /> */}
        <Skills />
      </div>
    </main>
  );
}
