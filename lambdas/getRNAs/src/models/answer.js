import { Schema, SchemaTypes, model } from 'mongoose';

const answerSchema = new Schema({
  questionId: {
    type: SchemaTypes.String,
    required: true
  },
  rnaId: {
    type: SchemaTypes.ObjectId,
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
  }
}, { versionKey: false });

export const Answer = model('answer', answerSchema);