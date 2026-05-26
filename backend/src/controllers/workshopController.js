import crypto from "crypto";
import Workshop from "../models/Workshop.js";
import WorkshopRegistration from "../models/WorkshopRegistration.js";

const getAvailableSeats = async (workshopId, capacity) => {
  const reservedCount = await WorkshopRegistration.countDocuments({
    workshop: workshopId,
    status: { $ne: "cancelled" },
  });

  return Math.max(capacity - reservedCount, 0);
};

const formatWorkshop = async (workshop) => {
  const obj = workshop.toObject ? workshop.toObject() : workshop;
  const availableSeats = await getAvailableSeats(obj._id, obj.capacity);

  return {
    ...obj,
    availableSeats,
    isSoldOut: availableSeats <= 0,
  };
};

export const getWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find({ isActive: true }).sort({ startsAt: 1 });
    res.json(await Promise.all(workshops.map(formatWorkshop)));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWorkshopById = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id).populate("formateur", "name email");

    if (!workshop || !workshop.isActive) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    res.json(await formatWorkshop(workshop));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFormateurWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find({
      formateur: req.user._id,
      isActive: true,
    }).sort({ startsAt: 1 });

    res.json(await Promise.all(workshops.map(formatWorkshop)));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.create({
      ...req.body,
      formateur: req.user._id,
    });

    res.status(201).json(await formatWorkshop(workshop));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);

    if (!workshop || !workshop.isActive) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    if (workshop.formateur.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only edit your own workshops" });
    }

    const allowedUpdates = [
      "title",
      "description",
      "image",
      "category",
      "location",
      "isOnline",
      "startsAt",
      "endsAt",
      "capacity",
      "price",
      "currency",
      "techniques",
      "included",
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        workshop[field] = req.body[field];
      }
    });

    await workshop.save();
    res.json(await formatWorkshop(workshop));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);

    if (!workshop || !workshop.isActive) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    if (workshop.formateur.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own workshops" });
    }

    workshop.isActive = false;
    await workshop.save();

    res.json({ message: "Workshop deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);

    if (!workshop || !workshop.isActive) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    if (new Date(workshop.startsAt) < new Date()) {
      return res.status(400).json({ message: "This workshop has already started" });
    }

    const existingRegistration = await WorkshopRegistration.findOne({
      workshop: workshop._id,
      user: req.user._id,
      status: { $ne: "cancelled" },
    });

    if (existingRegistration) {
      return res.status(400).json({ message: "You are already registered for this workshop" });
    }

    const availableSeats = await getAvailableSeats(workshop._id, workshop.capacity);

    if (availableSeats <= 0) {
      return res.status(400).json({ message: "Workshop is full" });
    }

    const registration = await WorkshopRegistration.create({
      workshop: workshop._id,
      user: req.user._id,
      registrationCode: crypto.randomBytes(12).toString("hex").toUpperCase(),
    });

    const populatedRegistration = await WorkshopRegistration.findById(registration._id)
      .populate("workshop")
      .populate("user", "name email");

    res.status(201).json(populatedRegistration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyWorkshopRegistrations = async (req, res) => {
  try {
    const registrations = await WorkshopRegistration.find({ user: req.user._id })
      .populate("workshop")
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelMyWorkshopRegistration = async (req, res) => {
  try {
    const registration = await WorkshopRegistration.findOne({
      _id: req.params.registrationId,
      user: req.user._id,
    }).populate("workshop");

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    if (registration.status === "cancelled") {
      return res.status(400).json({ message: "Registration is already cancelled" });
    }

    if (registration.workshop?.startsAt && new Date(registration.workshop.startsAt) < new Date()) {
      return res.status(400).json({ message: "You cannot cancel after the workshop starts" });
    }

    registration.status = "cancelled";
    await registration.save();

    res.json({ message: "Workshop registration cancelled", registration });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWorkshopRegistrations = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);

    if (!workshop || !workshop.isActive) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    if (workshop.formateur.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only view registrations for your own workshops" });
    }

    const registrations = await WorkshopRegistration.find({ workshop: workshop._id })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
