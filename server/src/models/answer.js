import { Schema, SchemaTypes, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; 

const answerSchema = new Schema({
  id: {
    type: SchemaTypes.String,
    required: true,
    default: () => uuidv4()
  },
  questionId: {
    type: SchemaTypes.String,
    required: true
  },
  rnaId: {
    type: SchemaTypes.String,
    required: true
  },
  value: {
    type: SchemaTypes.Mixed,
    required: true
  },
  photos: {
    type: [SchemaTypes.String],
    required: false
  },
  notes: {
    type: SchemaTypes.String,
    required: false
  },
  createdOn: {
    type: SchemaTypes.Date,
    required: true,
    default: () => new Date()
  },
}, { versionKey: false });

export const Answer = model('answer', answerSchema);