import { Schema, SchemaTypes, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; 

const rnaSchema = new Schema({
  id: {
    type: SchemaTypes.String,
    required: true,
    default: () => uuidv4()
  },
  isCompleted: {
    type: SchemaTypes.Boolean,
    default: false
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
  createdOn: {
    type: SchemaTypes.Date,
    required: true,
    default: () => new Date()
  },
  lastUpdatedOn: {
    type: SchemaTypes.Date,
    required: false
  },
}, { versionKey: false });

export const RNA = model('rna', rnaSchema);