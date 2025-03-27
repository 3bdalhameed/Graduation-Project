import { useRef, useState } from "react";
import { FiLock } from "react-icons/fi";
import { motion } from "framer-motion";

const Example = () => {
  return (
    <div className="grid min-h-[200px] place-content-center">
      <EncryptButton />
    </div>
  );
};

const TARGET_TEXT = "Explore Services";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = "!@#$%^&*():{};|,.<>/?";

const EncryptButton = () => {
  const intervalRef = useRef(null);

  const [text, setText] = useState(TARGET_TEXT);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);

    setText(TARGET_TEXT);
  };

  return (
<motion.div
  whileHover={{
    scale: 1.025,
  }}
  whileTap={{
    scale: 0.975,
  }}
  onMouseEnter={scramble}
  onMouseLeave={stopScramble}
  className="group relative overflow-hidden rounded-lg border-[1px] border-primary-300/30 dark:border-primary-700/50 bg-white dark:bg-gray-800 px-4 py-2 font-mono font-medium uppercase text-primary-700 dark:text-primary-300 shadow-sm hover:shadow-md transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-200 cursor-pointer ring-offset-2 hover:ring-2 hover:ring-primary-300/50 dark:hover:ring-primary-600/50"
>
  <div className="relative z-10 flex items-center gap-2">
    <span>{text}</span>
  </div>
  <motion.span
    initial={{
      y: "100%",
    }}
    animate={{
      y: "-100%",
    }}
    transition={{
      repeat: Infinity,
      repeatType: "mirror",
      duration: 1,
      ease: "linear",
    }}
    className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-primary-400/0 from-40% via-primary-400/20 dark:via-primary-500/30 to-primary-400/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
  />
</motion.div>

  );
};

export default Example;