import ExpertContent from "../models/ExpertContent.js";
import User from "../models/User.js";

const contentFields = ["title", "type", "summary", "body", "mediaUrl", "status"];

const populateExpert = (query) =>
  query.populate("expert", "name email expertProfile role");

export const getPublishedExpertContent = async (req, res) => {
  try {
    const contents = await populateExpert(
      ExpertContent.find({ isActive: true, status: "published" }).sort({ createdAt: -1 })
    );

    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyExpertContent = async (req, res) => {
  try {
    const contents = await populateExpert(
      ExpertContent.find({ expert: req.user._id, isActive: true }).sort({ createdAt: -1 })
    );

    res.json(contents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createExpertContent = async (req, res) => {
  try {
    const content = await ExpertContent.create({
      ...req.body,
      expert: req.user._id,
    });

    const populated = await populateExpert(ExpertContent.findById(content._id));
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateExpertContent = async (req, res) => {
  try {
    const content = await ExpertContent.findById(req.params.id);

    if (!content || !content.isActive) {
      return res.status(404).json({ message: "Content not found" });
    }

    if (content.expert.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only edit your own content" });
    }

    contentFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        content[field] = req.body[field];
      }
    });

    await content.save();
    const populated = await populateExpert(ExpertContent.findById(content._id));
    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteExpertContent = async (req, res) => {
  try {
    const content = await ExpertContent.findById(req.params.id);

    if (!content || !content.isActive) {
      return res.status(404).json({ message: "Content not found" });
    }

    if (content.expert.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own content" });
    }

    content.isActive = false;
    await content.save();

    res.json({ message: "Content deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpertProfile = async (req, res) => {
  res.json({
    name: req.user.name,
    email: req.user.email,
    expertProfile: req.user.expertProfile || {},
  });
};

export const updateExpertProfile = async (req, res) => {
  try {
    const allowedFields = ["specialty", "bio", "phone", "image", "location"];
    const expertProfile = { ...(req.user.expertProfile?.toObject?.() || req.user.expertProfile || {}) };

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        expertProfile[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { expertProfile },
      { new: true, runValidators: true }
    ).select("-password");

    res.json({
      name: user.name,
      email: user.email,
      expertProfile: user.expertProfile,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
