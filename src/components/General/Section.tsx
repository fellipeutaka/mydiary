import { Flex } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const MotionSection = motion(Flex);

type SectionProps = {
  children: ReactNode;
  delay?: number;
};

export default function Section({ children, delay = 0 }: SectionProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } /* else {
      controls.start("hidden");
    } */
  }, [controls, inView]);

  const sectionVariants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
    hidden: { y: 10, opacity: 0 },
  };

  return (
    <MotionSection
      as="section"
      w="100%"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      textAlign="center"
      px={6}
      gap={[4, 6]}
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={sectionVariants}
    >
      {children}
    </MotionSection>
  );
}
