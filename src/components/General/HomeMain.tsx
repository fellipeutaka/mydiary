import { Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const MotionSection = motion(Flex);

type SectionProps = {
  children: ReactNode;
  delay?: number;
};

export default function HomeMain({ children, delay = 0 }: SectionProps) {
  const sectionVariants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
    hidden: { y: 15, opacity: 0.4 },
  };

  return (
    <MotionSection
      as="main"
      w="100%"
      justifyContent="center"
      alignItems="center"
      flexDir={["column", "column", "row"]}
      mb={[16, 32]}
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      {children}
    </MotionSection>
  );
}
