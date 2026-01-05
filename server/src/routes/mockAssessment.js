import { Router } from "express";
import prisma from "../prisma/client.js";
import { authenticate } from "../middlewares/auth.js";

const router = Router();

// Get all assessments for user
router.get("/", authenticate, async (req, res) => {
  try {
    const assessments = await prisma.mockAssessment.findMany({
      where: { userId: req.user.id },
      include: { result: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new assessment
router.post("/", authenticate, async (req, res) => {
  const { jobRole, topic, difficulty, questions, duration } = req.body;
  try {
    const assessment = await prisma.mockAssessment.create({
      data: {
        userId: req.user.id,
        jobRole,
        topic,
        difficulty,
        questions,
        duration,
        status: 'pending'
      }
    });
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit assessment result
router.post("/:id/submit", authenticate, async (req, res) => {
  const { score, topicScores, strengths, weaknesses, feedback, userAnswers } = req.body;
  try {
    // Check if assessment exists and belongs to user
    const assessment = await prisma.mockAssessment.findFirst({
      where: { id: req.params.id, userId: req.user.id }
    });

    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    const result = await prisma.mockAssessmentResult.create({
      data: {
        assessmentId: req.params.id,
        score,
        topicScores,
        strengths,
        weaknesses,
        feedback,
        userAnswers,
      }
    });

    await prisma.mockAssessment.update({
      where: { id: req.params.id },
      data: { status: 'completed' }
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
