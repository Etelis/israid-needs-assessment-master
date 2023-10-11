import { Schema, SchemaTypes, model } from 'mongoose';

const rnaSchema = new Schema({
  status: {
    type: SchemaTypes.Number,
    enum: [1, 2],
    default: 1
  },
  communityName: {
    type: SchemaTypes.String,
    required: true
  },
  communityType: {
    type: SchemaTypes.String,
    required: true
  },
  location: {
    type: SchemaTypes.String,
    required: false
  },
  creationDate: {
    type: SchemaTypes.Date,
    required: true,
    default: () => new Date()
  },
  lastUpdateDate: {
    type: SchemaTypes.Date,
    required: false
  },
}, { versionKey: false });

export const RNA = model('rna', rnaSchema);