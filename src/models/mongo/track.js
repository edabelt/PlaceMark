import Mongoose from "mongoose";

const { Schema } = Mongoose;

const trackSchema = new Schema({
  name: String,
  locationName: String,
  latitude: Number,
  longitude: Number,
  description: String,
  image: String,
  playlistid: {
    type: Schema.Types.ObjectId,
    ref: "Playlist",
  },
});

export const Track = Mongoose.model("Track", trackSchema);