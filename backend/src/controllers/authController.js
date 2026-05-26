import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register user
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const requestedRoles = ['vendor', 'formateur', 'expert'];
    const requestedRole = requestedRoles.includes(role) ? role : '';

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user',
      requestedRole,
      roleRequestStatus: requestedRole ? 'pending' : 'none'
    });

    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      requestedRole: user.requestedRole,
      roleRequestStatus: user.roleRequestStatus,
      expertProfile: user.expertProfile,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login user
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      requestedRole: user.requestedRole,
      roleRequestStatus: user.roleRequestStatus,
      expertProfile: user.expertProfile,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user
export const getMe = async (req, res) => {
  res.json({
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      requestedRole: req.user.requestedRole,
      roleRequestStatus: req.user.roleRequestStatus,
      expertProfile: req.user.expertProfile
    }
  });
};

export const getUsersForAdmin = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ roleRequestStatus: -1, createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role, roleRequestStatus } = req.body;
    const allowedRoles = ['user', 'vendor', 'formateur', 'expert', 'admin'];
    const allowedStatuses = ['none', 'pending', 'approved', 'rejected'];

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (role !== undefined) {
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }

      user.role = role;
      user.requestedRole = '';
      user.roleRequestStatus = role === 'user' ? 'none' : 'approved';
    }

    if (roleRequestStatus !== undefined) {
      if (!allowedStatuses.includes(roleRequestStatus)) {
        return res.status(400).json({ message: 'Invalid request status' });
      }

      user.roleRequestStatus = roleRequestStatus;

      if (roleRequestStatus === 'rejected' || roleRequestStatus === 'none') {
        user.requestedRole = '';
      }
    }

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
