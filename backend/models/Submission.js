const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  
  clientName: { type: String },
  clientContact: { type: String },

  country: { type: String, required: true },
  province: { type: String },
  county: { type: String },
  address: { type: String },
  latitude: { type: Number }, 
  longitude: { type: Number },

  hotspots: { type: [String], default: [] },
  risksFaced: { type: String }, 
  indigenousKnowledge: { type: String },
  improvementsNeeded: { type: String },
  managementPreferences: { type: String },
  supportNeeded: { type: String },

  metadata: { type: mongoose.Schema.Types.Mixed },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', SubmissionSchema);
