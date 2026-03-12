import DashboardNav from "@/components/DashboardNav";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-background mesh-bg">
      <DashboardNav />
      <div className="max-w-6xl mx-auto px-4 pt-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-extrabold gradient-text"
        >
          Home
        </motion.h1>
      </div>
    </div>
  );
};

export default Home;
