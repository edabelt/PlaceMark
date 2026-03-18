import { Track } from "./track.js";

export const trackMongoStore = {

  async getAllTracks() {
    const tracks = await Track.find().lean();
    return tracks;
  },

  async addTrack(playlistId, track) {

    const newTrack = {
      name: track.name,
      locationName: track.locationName,
      latitude: Number(track.latitude),
      longitude: Number(track.longitude),
      description: track.description,
      image: track.image,
      playlistid: playlistId
    };

    const trackDoc = new Track(newTrack);
    const savedTrack = await trackDoc.save();

    return this.getTrackById(savedTrack._id);
  },

  async getTracksByPlaylistId(id) {
    const tracks = await Track.find({ playlistid: id }).lean();
    return tracks;
  },

  async getTrackById(id) {
    if (id) {
      const track = await Track.findOne({ _id: id }).lean();
      return track;
    }
    return null;
  },

  async deleteTrack(id) {
    try {
      await Track.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllTracks() {
    await Track.deleteMany({});
  },

  async updateTrack(track, updatedTrack) {

    if (!track || !track._id) {
      throw new Error("Invalid track supplied for update");
    }

    const trackDoc = await Track.findOne({ _id: track._id });

    if (!trackDoc) {
      throw new Error("Track not found");
    }

    trackDoc.name = updatedTrack.name;
    trackDoc.locationName = updatedTrack.locationName;
    trackDoc.latitude = Number(updatedTrack.latitude);
    trackDoc.longitude = Number(updatedTrack.longitude);
    trackDoc.description = updatedTrack.description;
    trackDoc.image = updatedTrack.image;

    await trackDoc.save();

    return trackDoc;
  }

};