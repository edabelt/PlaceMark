import Mongoose from "mongoose";

const { Schema } = Mongoose;

const trackSchema = new Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  playlistid: {
    type: Schema.Types.ObjectId,
    ref: "Playlist",
  },
});

export const Track = Mongoose.model("Track", trackSchema);