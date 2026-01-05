import { Router } from "express";
import prisma from "../prisma/client.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

// Get progress
router.get("/progress", authenticate, async (req, res) => {
  try {
    let progress = await prisma.aptitude_mentor_progress.findUnique({
      where: { userId: req.user.id },
    });

    if (!progress) {
      progress = await prisma.aptitude_mentor_progress.create({
        data: { userId: req.user.id },
      });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update progress
router.post("/progress", authenticate, async (req, res) => {
  const { activeTab, completedSubtopics, learnedSubtopics } = req.body;
  try {
    const progress = await prisma.aptitude_mentor_progress.upsert({
      where: { userId: req.user.id },
      update: {
        activeTab,
        completedSubtopics,
        learnedSubtopics,
      },
      create: {
        userId: req.user.id,
        activeTab,
        completedSubtopics,
        learnedSubtopics,
      },
    });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
