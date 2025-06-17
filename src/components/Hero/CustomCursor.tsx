import React from "react";
import { motion, MotionValue } from "framer-motion";

// Props 타입 정의
interface CustomCursorProps {
  smoothCursorX: MotionValue<number>;
  smoothCursorY: MotionValue<number>;
  isHovering: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({
  smoothCursorX,
  smoothCursorY,
  isHovering,
}) => {
  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-difference"
      style={{
        x: smoothCursorX,
        y: smoothCursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className={`rounded-full bg-white ${
          isHovering ? "w-16 h-16" : "w-4 h-4"
        } transition-all duration-300`}
        animate={{ scale: isHovering ? 1.5 : 1 }}
      />
    </motion.div>
  );
};

export default CustomCursor;
