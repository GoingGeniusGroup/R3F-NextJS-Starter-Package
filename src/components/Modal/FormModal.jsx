import { transform } from "next/dist/build/swc";

const FormModal = (show, onclose, children) => {
    return(
        <div
            style={{
                transform: show ? "translateX(0%)" : "translateX(-200%)",
            }}
            className="absolute top-0 left-0 w-full h-full z-20 transition-all duration-500 overflow-scroll"
        >
            <div className="container mx-auto max-w-2xl h-[80vh] rounded-3xl bg-violet-500 backdrop-blur-xl">
                <button
                    onClick={() => {
                        onclose(false);
                    }}
                    className="rounded-full w-10 h-10 bg-fuchsia-300"
                >
                    <img src="https://api.iconify.design/material-symbols:cancel-rounded.svg"></img>
                </button>
                {children}
            </div>
        </div>
    )

}

export default FormModal;