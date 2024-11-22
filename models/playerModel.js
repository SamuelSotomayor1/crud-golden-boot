import mongoose, {Schema} from "mongoose";

const topicSchema = new Schema ({
    player: {type: String, required: true},
    goals: {type: Number, required: true},
    matchs: {type: Number, required: true},
});

const playerModel = mongoose.models.Player || mongoose.model("Player", topicSchema);

export default playerModel;