// Naheeda
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({

    vorname: { type: String, required: true }, 
    nachname: { type: String, required: true },  
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    telefonnummer: { type: String, default: "" },
    landesvorwahl: { type: String, default: "+49" },
    address: {
        land: { type: String, default: "" },
        straße: { type: String, default: "" },
        snummer:{ type: String, default: "" },
        stadt: { type: String, default: "" },
        postleitzahl: { type: String, default: "" }
},
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

// Passwort hashen
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
    return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Passwort überprüfen
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model('User', UserSchema);
