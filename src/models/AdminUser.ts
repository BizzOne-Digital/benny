import mongoose, { Schema, Model } from 'mongoose'

export interface IAdminUser {
  _id: mongoose.Types.ObjectId
  email: string
  password: string
  name: string
  role: 'superadmin' | 'admin' | 'editor'
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['superadmin', 'admin', 'editor'],
      default: 'admin',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

// Remove password from JSON responses
AdminUserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    const { password: _removed, ...safe } = ret as typeof ret & { password?: string }
    void _removed
    return safe
  },
})

const AdminUser: Model<IAdminUser> =
  mongoose.models.AdminUser || mongoose.model<IAdminUser>('AdminUser', AdminUserSchema)

export default AdminUser
