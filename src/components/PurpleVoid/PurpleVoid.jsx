"use client";

const PurpleVoid = () => (
    <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-290px] h-screen w-full left-0 z-[0] object-cover"
    >
        <source src="/bg/blackhole.webm" type="video/webm"/>
    </video>
)

export default PurpleVoid;


