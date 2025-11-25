const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          
    email: { type: String, required: true },         

    country: { type: String, required: true },       
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

  },
  { timestamps: true } 
);

module.exports = mongoose.model('Submission', SubmissionSchema);
