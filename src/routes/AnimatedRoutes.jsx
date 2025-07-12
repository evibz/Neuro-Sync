import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Layout from '../components/layout/Layout';
import LandingPage from '../pages/LandingPage';
import DashboardPage from '../pages/DashboardPage';
import GenomePage from '../pages/GenomePage';
import CognitiveSyncPage from '../pages/CognitiveSyncPage';
import VoiceInteractionPage from '../pages/VoiceInteractionPage';
import NeuroAugmentationPage from '../pages/NeuroAugmentationPage'; // ✅ Added
import TestPage from '../pages/TestPage';

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
              >
                <GenomePage />
              </motion.div>
            </Layout>
          }
        />
        <Route
          path="/cognitive-sync"
          element={
            <Layout>
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                transition={pageTransition}
              >
                <CognitiveSyncPage />
              </motion.div>
            </Layout>
          }
        />
        <Route
          path="/voice"
          element={
            <Layout>
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                transition={pageTransition}
              >
                <VoiceInteractionPage />
              </motion.div>
            </Layout>
          }
        />
        <Route
          path="/neuro-augmentation"
          element={
            <Layout>
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                transition={pageTransition}
              >
                <NeuroAugmentationPage />
              </motion.div>
            </Layout>
          }
        />
        <Route path="/test" element={<TestPage />} />
        <Route
          path="*"
          element={
            <Layout>
              <div className="p-10 text-center text-white text-2xl">404 - Page Not Found</div>
            </Layout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;