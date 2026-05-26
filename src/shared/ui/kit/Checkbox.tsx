import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

const Checkbox = ({ defaultState = false, onClick }: { defaultState: boolean; onClick: (e: boolean) => void }) => {
    const [isChecked, setIsChecked] = useState(defaultState);
    return (
        <button
            onClick={() => {
                const changeState = !isChecked;

                setIsChecked(changeState);
                onClick(changeState);
            }}
            type="button"
            className={`w-[2.4rem] h-[2.4rem] cursor-pointer ${isChecked ? "bg-[var(--adaptive-black500)] hover:bg-[var(--adaptive-black400)] border-transparent" : "bg-transparent hover:bg-[var(--adaptive-black50)] border-[var(--adaptive-grey200)]"} border rounded-[0.8rem]`}
        >
            {isChecked ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{
                        delay: 0.1,
                        type: "spring",
                        mass: 0.1,
                        stiffness: 100,
                        damping: 10,
                    }}
                    className="select-none pointer-events-none relative"
                >
                    <Image
                        src={"/images/icon/outlined/ico-outlined-check.svg"}
                        alt=""
                        width={52}
                        height={52}
                        className="invert absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"
                    />
                </motion.div>
            ) : null}
        </button>
    );
};

export default Checkbox;
