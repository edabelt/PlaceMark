import { TrackSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const playlist = await db.playlistStore.getPlaylistById(request.params.id);

      const viewData = {
        title: "Category",
        playlist: playlist,
      };

      return h.view("category-view", viewData);
    },
  },

  addTrack: {
    validate: {
      payload: TrackSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const currentPlaylist = await db.playlistStore.getPlaylistById(request.params.id);

        return h
          .view("category-view", {
            title: "Add PlaceMark Error",
            playlist: currentPlaylist,
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },

    handler: async function (request, h) {
      const playlist = await db.playlistStore.getPlaylistById(request.params.id);

      const newTrack = {
        name: request.payload.name,
        locationName: request.payload.locationName,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        description: request.payload.description,
        image: request.payload.image,
      };

      await db.trackStore.addTrack(playlist._id, newTrack);
      return h.redirect(`/category/${playlist._id}`);
    },
  },

  deleteTrack: {
    handler: async function (request, h) {
      const playlist = await db.playlistStore.getPlaylistById(request.params.id);
      await db.trackStore.deleteTrack(request.params.trackid);
      return h.redirect(`/category/${playlist._id}`);
    },
  },
};