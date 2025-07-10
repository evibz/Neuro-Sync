import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Layout from '../components/layout/Layout';
import LandingPage from '../pages/LandingPage';
import DashboardPage from '../pages/DashboardPage';
import GenomePage from '../pages/GenomePage';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Layout>
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                transition={pageTransition}
                style={{ height: '100%' }}
              >
                <LandingPage />
              </motion.div>
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                transition={pageTransition}
                style={{ height: '100%' }}
              >
                <DashboardPage />
              </motion.div>
            </Layout>
          }
        />
        <Route
          path="/genome"
          element={
            <Layout>
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                transition={pageTransition}
                style={{ height: '100%' }}
              >
                <GenomePage />
              </motion.div>
            </Layout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;