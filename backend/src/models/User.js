import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'vendor', 'formateur', 'expert', 'admin'],
    default: 'user'
  },
  requestedRole: {
    type: String,
    enum: ['vendor', 'formateur', 'expert', ''],
    default: ''
  },
  roleRequestStatus: {
    type: String,
    enum: ['none', 'pending', 'approved', 'rejected'],
    default: 'none'
  },
  expertProfile: {
    specialty: { type: String, default: '' },
    bio: { type: String, default: '' },
    phone: { type: String, default: '' },
    image: { type: String, default: '' },
    location: { type: String, default: '' }
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
