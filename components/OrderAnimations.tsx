import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import order from '@/public/order.json';

const OrderAnimation = () => {
  return (
    <div className="mt-12 flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Prepping your order
      </motion.h1>
      <Player autoplay loop src={order} />
    </div>
  );
};

export default OrderAnimation;
