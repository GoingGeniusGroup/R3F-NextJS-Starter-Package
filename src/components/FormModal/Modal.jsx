import { motion } from "framer-motion"

const FormModal = ({show, onclose, children}) => {
    return(
        <motion.div
            style={{
                transform: show ? "translateX(0%)" : "translateX(-200%)"
            }}
            className="absolute top-0 left-0 w-full h-full z-20 transition-all duration-700"
        >
            <div className="container mx-auto max-w-2xl h-auto shadow-violet-500 shadow-sm rounded-3xl backdrop-blur-md p-3">
                <motion.button
                    whileHover = {{scale:1.1}}
                    whileTap = {{scale:0.8}}
                    onClick={() => {
                        onclose(false);
                    }}
                    className="rounded-full w-10 h-10 bg-violet-400 backdrop-blur-sm flex items-center justify-center"
                >
                    <img src="https://api.iconify.design/material-symbols:cancel-rounded.svg"
                        className="h-6"
                    />
                </motion.button>
                {children}
            </div>
        </motion.div>
    )

}

export default FormModal;