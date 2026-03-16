import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("david@example.com").required(),
    password: Joi.string().example("secret123").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("David").required(),
  lastName: Joi.string().example("Beltran").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const TrackSpec = Joi.object()
  .keys({
    name: Joi.string().required().example("Cliffs of Moher"),
    latitude: Joi.number().required().messages({
      "number.base": "Latitude must be a number",
    }).example(52.9715),
    longitude: Joi.number().required().messages({
      "number.base": "Longitude must be a number",
    }).example(-9.4309),
    playlistid: IdSpec,
  })
  .label("PlaceMark");

export const TrackSpecPlus = TrackSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlaceMarkPlus");

export const TrackArraySpec = Joi.array().items(TrackSpecPlus).label("PlaceMarkArray");

export const PlaylistSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Irish Landmarks"),
    userid: IdSpec,
    tracks: TrackArraySpec,
  })
  .label("Category");

export const PlaylistSpecPlus = PlaylistSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CategoryPlus");

export const PlaylistArraySpec = Joi.array().items(PlaylistSpecPlus).label("CategoryArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example(true).required(),
    token: Joi.string().example("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example.signature").required(),
  })
  .label("JwtAuth");