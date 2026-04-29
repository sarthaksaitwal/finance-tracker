import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10;

const userSchema = new mongoose.Schema(
        {
                username: {
                        type: String,
                        required: true,
                        trim: true
                },
                email: {
                        type: String,
                        required: true,
                        unique: true,
                        trim: true,
                        lowercase: true
                },
                password: {
                        type: String,
                        required: true
                }
        },
        { timestamps: true }
)

// Ensure passwords are bcrypt-hashed before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    const pw = this.password || ''
    const isBcryptHash = typeof pw === 'string' && /^\$2[aby]\$/.test(pw)
    if (isBcryptHash) return
    this.password = await bcrypt.hash(pw, SALT_ROUNDS)
})

// Handle direct updates (findOneAndUpdate) that set password via $set/password
userSchema.pre('findOneAndUpdate', async function () {
    const update = this.getUpdate()
    if (!update) return
    const proposed = update.password || (update.$set && update.$set.password)
    if (!proposed) return
    const isBcryptHash = typeof proposed === 'string' && /^\$2[aby]\$/.test(proposed)
    if (isBcryptHash) return
    const hashed = await bcrypt.hash(proposed, SALT_ROUNDS)
    if (update.password) update.password = hashed
    else if (update.$set && update.$set.password) update.$set.password = hashed
    this.setUpdate(update)
})

const User = mongoose.model('User', userSchema);

export default User;