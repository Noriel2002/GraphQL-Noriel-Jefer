import mongoose from 'mongoose';

const PersonaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
    unique: true,
  },
  edad: {
    type: String,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Persona', PersonaSchema);
