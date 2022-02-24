import { Schema, model } from 'mongoose';

const customerDetailsSchema = new Schema ({
  addressType: {
    type: String,
    required: true
  },
  fullAddress: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  userId: {
    type: String
  }
},
{
  timestamps: true
})

export default model ('CustomerDetails', customerDetailsSchema)