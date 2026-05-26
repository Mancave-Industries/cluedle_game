window.CLUEDLE_DATA = window.CLUEDLE_DATA || {};

window.CLUEDLE_DATA.rankRules = {
 rollingWindow: 10,

 scoreBySolveTurn: {
   1: 100,
   2: 90,
   3: 80,
   4: 65,
   5: 50,
   6: 35,
   7: 20,
   8: 10,
   fail: 0
 },

 ranks: [
   {
     id: "trainee_detective",
     name: "Trainee Detective",
     guessLimit: 8,
     requiredStreak: 0,
     requiredDetectionScore: 0,
     dossierStyle: "basic"
   },
   {
     id: "detective",
     name: "Detective",
     guessLimit: 8,
     requiredStreak: 2,
     requiredDetectionScore: 35,
     dossierStyle: "standard"
   },
   {
     id: "senior_detective",
     name: "Senior Detective",
     guessLimit: 7,
     requiredStreak: 4,
     requiredDetectionScore: 50,
     dossierStyle: "enhanced"
   },
   {
     id: "lead_detective",
     name: "Lead Detective",
     guessLimit: 7,
     requiredStreak: 6,
     requiredDetectionScore: 60,
     dossierStyle: "casefile"
   },
   {
     id: "detective_lieutenant",
     name: "Detective Lieutenant",
     guessLimit: 6,
     requiredStreak: 8,
     requiredDetectionScore: 68,
     dossierStyle: "classified"
   },
   {
     id: "detective_captain",
     name: "Detective Captain",
     guessLimit: 6,
     requiredStreak: 12,
     requiredDetectionScore: 74,
     dossierStyle: "priority"
   },
   {
     id: "chief_detective",
     name: "Chief Detective",
     guessLimit: 5,
     requiredStreak: 16,
     requiredDetectionScore: 80,
     dossierStyle: "restricted"
   },
   {
     id: "master_detective",
     name: "Master Detective",
     guessLimit: 5,
     requiredStreak: 24,
     requiredDetectionScore: 86,
     dossierStyle: "black_archive"
   }
 ],

 appraisalText: {
   eligible: "Promotion Appraisal active.",
   notEligible: "Maintain your streak and raise your Detection Score.",
   maxRank: "Maximum clearance achieved.",
   demotionRisk: "Performance review triggered. Solve cleanly to protect your rank."
 }
};
