import { Schema, model } from "mongoose";

const userReferralInfoSchema = new Schema({
    address: {
        type: String,
        required: [true, "user address cannot be blank"],
        unique: true,
        match: [/^0x[a-fA-F0-9]{40}$/, "invalid wallet address"],
    },
    code: {
        type: String,
        required: [true, "referral code cannot be blank"],
        unique: true,
        match: [/^[A-Za-z0-9_-]{14}}$/, "invalid ref code"],
    },
});

export default model("userReferralInfo", userReferralInfoSchema);
