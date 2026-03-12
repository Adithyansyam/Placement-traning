import express from "express";
import { getDB } from "../db.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const users = await db.collection("users").find({}).toArray();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const db = getDB();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST — register a new user
router.post("/register", async (req, res) => {
  try {
    console.log("📝 Register request received:", req.body);
    
    const db = getDB();
    const { name, email, password, role, branch, cgpa, skills } = req.body;

    if (!name || !email || !password) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: "name, email and password are required" });
    }

    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      console.log("❌ User already exists:", email);
      return res.status(409).json({ error: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role: role || "student",
      branch: branch || null,
      cgpa: cgpa ? parseFloat(cgpa) : null,
      skills: skills || [],
      createdAt: new Date(),
    });

    console.log("✅ User registered successfully:", result.insertedId);

    const token = jwt.sign(
      { id: result.insertedId, email, role: role || "student" },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    res.status(201).json({ message: "User registered", token, user: { id: result.insertedId, name, email, role: role || "student" } });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST — login
router.post("/login", async (req, res) => {
  try {
    const db = getDB();
    const { email, password } = req.body;

    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT — update user profile
router.put("/:id", async (req, res) => {
  try {
    const db = getDB();
    const userId = req.params.id;
    
    // Prevent password updates through this endpoint
    const { password, ...updateData } = req.body;
    
    const result = await db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: updateData },
      { returnDocument: "after" }
    );
    
    if (!result.value) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json({ message: "Profile updated", user: result.value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a user
router.delete("/:id", async (req, res) => {
  try {
    const db = getDB();
    await db.collection("users").deleteOne({ _id: new ObjectId(req.params.id) });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET student dashboard data
router.get("/dashboard/student/:userId", async (req, res) => {
  try {
    const db = getDB();
    const userId = req.params.userId;
    
    // Fetch student's test scores with timestamp
    const testScores = await db.collection("testAttempts")
      .find({ userId: new ObjectId(userId) })
      .sort({ attemptDate: -1 })
      .limit(8)
      .toArray();
    
    // Calculate statistics
    const allAttempts = await db.collection("testAttempts")
      .find({ userId: new ObjectId(userId) })
      .toArray();
    
    const avgScore = allAttempts.length > 0 
      ? Math.round(allAttempts.reduce((sum, a) => sum + (a.score || 0), 0) / allAttempts.length)
      : 0;

    const stats = [
      { id: "tests", label: "Tests Taken", value: allAttempts.length.toString(), icon: "ClipboardCheck", color: "from-primary to-primary/70" },
      { id: "avg", label: "Average Score", value: `${avgScore}%`, icon: "Target", color: "from-purple-500 to-pink-500" },
      { id: "streak", label: "Study Streak", value: "5 days 🔥", icon: "Flame", color: "from-orange-500 to-red-500" },
      { id: "readiness", label: "Readiness Score", value: `${Math.max(avgScore - 5, 0)}%`, icon: "Gauge", color: "from-emerald-500 to-teal-500" },
    ];

    // Fetch upcoming tests
    const upcomingTests = await db.collection("mockTests")
      .find({ scheduleDate: { $gte: new Date() } })
      .sort({ scheduleDate: 1 })
      .limit(3)
      .toArray();

    const formattedTests = upcomingTests.map(test => ({
      name: test.title,
      type: test.type || "Mock Test",
      date: new Date(test.scheduleDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    }));

    res.json({
      stats,
      scoreData: testScores.map((t, i) => ({ test: `Test ${i + 1}`, score: t.score || 0 })).reverse(),
      upcomingTests: formattedTests
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET placement dashboard data
router.get("/dashboard/placement", async (req, res) => {
  try {
    const db = getDB();
    
    // Fetch placement drives
    const drives = await db.collection("placementDrives").find({}).toArray();
    
    // Fetch placed students
    const placedStudents = await db.collection("placedStudents").find({}).toArray();
    
    // Calculate statistics
    const totalStudents = await db.collection("users")
      .countDocuments({ role: "student" });
    
    const placedCount = placedStudents.length;
    const avgPackage = placedStudents.length > 0
      ? (placedStudents.reduce((sum, s) => sum + (parseFloat(s.package) || 0), 0) / placedStudents.length).toFixed(1)
      : 0;

    const stats = [
      { label: "Registered Students", value: totalStudents.toString(), icon: "Users" },
      { label: "Companies Visiting", value: drives.length.toString(), icon: "Building2" },
      { label: "Placed Students", value: placedCount.toString(), icon: "UserCheck" },
      { label: "Avg Package", value: `₹${avgPackage} LPA`, icon: "IndianRupee" },
    ];

    res.json({ stats, drives, placedStudents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET admin dashboard data
router.get("/dashboard/admin", async (req, res) => {
  try {
    const db = getDB();
    
    // Fetch admin statistics
    const totalStudents = await db.collection("users")
      .countDocuments({ role: "student" });
    
    const testsPublished = await db.collection("mockTests").countDocuments();
    const materialsUploaded = await db.collection("studyMaterials").countDocuments();
    
    // Calculate average readiness score
    const allAttempts = await db.collection("testAttempts").find({}).toArray();
    const avgReadiness = allAttempts.length > 0
      ? Math.round(allAttempts.reduce((sum, a) => sum + (a.score || 0), 0) / allAttempts.length)
      : 0;

    const stats = [
      { label: "Total Students", value: totalStudents.toString(), icon: "Users" },
      { label: "Tests Published", value: testsPublished.toString(), icon: "ClipboardList" },
      { label: "Materials Uploaded", value: materialsUploaded.toString(), icon: "FileText" },
      { label: "Avg Readiness Score", value: `${avgReadiness}%`, icon: "TrendingUp" },
    ];

    // Fetch branch-wise performance data
    const branchData = await db.collection("users")
      .aggregate([
        { $match: { role: "student" } },
        { $group: { _id: "$branch", avgScore: { $avg: "$cgpa" } } },
      ])
      .toArray();

    const formattedBranchData = branchData.map(b => ({
      branch: b._id || "Unknown",
      score: Math.round((b.avgScore || 0) * 10)
    }));

    res.json({ stats, branchData: formattedBranchData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
