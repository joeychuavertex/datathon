import { Department, Question, Tag } from '../types';

export const mockDepartments: Department[] = [
  {
    id: 1,
    name: "Endocrinology",
    description: "Specializing in diabetes and hormonal disorders",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-03-15T00:00:00Z"
  },
  {
    id: 2,
    name: "Neurology",
    description: "Focusing on neurological conditions and disorders",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-03-15T00:00:00Z"
  },
  {
    id: 3,
    name: "Cardiology",
    description: "Specializing in heart and cardiovascular conditions",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-03-15T00:00:00Z"
  },
  {
    id: 4,
    name: "Rehabilitation",
    description: "Focusing on physical therapy and recovery programs",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-03-15T00:00:00Z"
  },
  {
    id: 5,
    name: "Laboratory Medicine",
    description: "Specializing in diagnostic testing and laboratory analysis",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-03-15T00:00:00Z"
  },
  {
    id: 6,
    name: "Pediatrics",
    description: "Focusing on child health and development",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-03-15T00:00:00Z"
  },
  {
    id: 7,
    name: "Oncology",
    description: "Specializing in cancer diagnosis and treatment",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-03-15T00:00:00Z"
  },
  {
    id: 8,
    name: "Gastroenterology",
    description: "Focusing on digestive system disorders",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-03-15T00:00:00Z"
  },
  {
    id: 9,
    name: "Pulmonology",
    description: "Specializing in respiratory conditions",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-03-15T00:00:00Z"
  },
  {
    id: 10,
    name: "Nephrology",
    description: "Focusing on kidney diseases and disorders",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-03-15T00:00:00Z"
  }
];

export const mockQuestions: Question[] = [
  // Endocrinology Questions
  {
    id: 1,
    title: "Trend Analysis of HbA1c Levels in Diabetic Patients",
    content: "What is the trend of HbA1c levels in diabetic patients over the past 6 months?",
    analysis_summary: "Analysis shows a 15% improvement in HbA1c control among diabetic patients following the new treatment protocol.",
    slicer_dicer_query: "SELECT patient_id, date, hba1c_value FROM lab_results WHERE test_type = 'HbA1c' AND date >= DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)",
    department_id: 1,
    department: mockDepartments[0],
    tags: [
      { 
        id: 57, 
        name: "Diabetes", 
        snomed_concept_id: "73211009", 
        description: "A chronic condition that affects how your body turns food into energy",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 58, 
        name: "HbA1c", 
        snomed_concept_id: "43396009", 
        description: "Glycated hemoglobin",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-03-01T00:00:00Z"
  },
  {
    id: 2,
    title: "Thyroid Function Test Patterns",
    content: "What are the patterns of thyroid function test results in patients with subclinical hypothyroidism?",
    analysis_summary: "Analysis reveals that 40% of patients with subclinical hypothyroidism progress to overt hypothyroidism within 2 years.",
    slicer_dicer_query: "SELECT patient_id, tsh_level, ft4_level, diagnosis_date FROM thyroid_tests WHERE diagnosis = 'Subclinical Hypothyroidism'",
    department_id: 1,
    department: mockDepartments[0],
    tags: [
      { 
        id: 3, 
        name: "Thyroid", 
        snomed_concept_id: "2093000", 
        description: "Thyroid disorder",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 4, 
        name: "Hormone", 
        snomed_concept_id: "267038008", 
        description: "Hormone test",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-15T00:00:00Z",
    updated_at: "2024-03-10T00:00:00Z"
  },
  {
    id: 3,
    title: "Obesity Management Outcomes",
    content: "How effective are different weight management interventions in patients with metabolic syndrome?",
    analysis_summary: "Combined lifestyle and pharmacological intervention showed 30% better weight loss outcomes compared to lifestyle changes alone.",
    slicer_dicer_query: "SELECT patient_id, intervention_type, weight_change, metabolic_parameters FROM obesity_management WHERE diagnosis = 'Metabolic Syndrome'",
    department_id: 1,
    department: mockDepartments[0],
    tags: [
      { 
        id: 5, 
        name: "Obesity", 
        snomed_concept_id: "414916001", 
        description: "Obesity",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 6, 
        name: "Metabolic", 
        snomed_concept_id: "237627005", 
        description: "Metabolic syndrome",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-20T00:00:00Z",
    updated_at: "2024-03-12T00:00:00Z"
  },

  // Neurology Questions
  {
    id: 4,
    title: "Parkinson's Disease Medication Adherence",
    content: "How does medication adherence affect symptom progression in Parkinson's patients?",
    analysis_summary: "Patients with >90% medication adherence showed 40% slower symptom progression.",
    slicer_dicer_query: "SELECT patient_id, medication_adherence, symptom_score FROM neurology_patients WHERE diagnosis = 'Parkinson's Disease'",
    department_id: 2,
    department: mockDepartments[1],
    tags: [
      { 
        id: 59, 
        name: "Stroke", 
        snomed_concept_id: "230690007", 
        description: "Cerebrovascular accident",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 60, 
        name: "Atrial Fibrillation", 
        snomed_concept_id: "49436004", 
        description: "Atrial fibrillation",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-10T00:00:00Z",
    updated_at: "2024-03-05T00:00:00Z"
  },
  {
    id: 5,
    title: "Epilepsy Seizure Control",
    content: "What factors influence seizure control in patients with refractory epilepsy?",
    analysis_summary: "Patients with regular sleep patterns and consistent medication timing showed 50% better seizure control.",
    slicer_dicer_query: "SELECT patient_id, sleep_pattern, medication_timing, seizure_frequency FROM epilepsy_patients WHERE diagnosis = 'Refractory Epilepsy'",
    department_id: 2,
    department: mockDepartments[1],
    tags: [
      { 
        id: 9, 
        name: "Epilepsy", 
        snomed_concept_id: "84757009", 
        description: "Epilepsy",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 10, 
        name: "Seizure", 
        snomed_concept_id: "91175000", 
        description: "Seizure disorder",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-25T00:00:00Z",
    updated_at: "2024-03-14T00:00:00Z"
  },
  {
    id: 6,
    title: "Multiple Sclerosis Treatment Response",
    content: "How do different disease-modifying therapies affect relapse rates in MS patients?",
    analysis_summary: "High-efficacy DMTs showed 60% reduction in annualized relapse rate compared to moderate-efficacy therapies.",
    slicer_dicer_query: "SELECT patient_id, treatment_type, relapse_count, edss_score FROM ms_patients WHERE diagnosis = 'Multiple Sclerosis'",
    department_id: 2,
    department: mockDepartments[1],
    tags: [
      { 
        id: 11, 
        name: "Multiple Sclerosis", 
        snomed_concept_id: "24700007", 
        description: "Multiple sclerosis",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 12, 
        name: "DMT", 
        snomed_concept_id: "763158003", 
        description: "Disease modifying therapy",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-03-01T00:00:00Z",
    updated_at: "2024-03-15T00:00:00Z"
  },

  // Cardiology Questions
  {
    id: 7,
    title: "Stroke Risk Assessment in Atrial Fibrillation",
    content: "What is the correlation between CHA2DS2-VASc scores and stroke incidence in our AF patients?",
    analysis_summary: "Patients with CHA2DS2-VASc scores ≥4 showed 3x higher stroke risk compared to lower scores.",
    slicer_dicer_query: "SELECT patient_id, chads_vasc_score, stroke_incidence FROM patient_records WHERE diagnosis = 'Atrial Fibrillation'",
    department_id: 3,
    department: mockDepartments[2],
    tags: [
      { 
        id: 59, 
        name: "Stroke", 
        snomed_concept_id: "230690007", 
        description: "Cerebrovascular accident",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 60, 
        name: "Atrial Fibrillation", 
        snomed_concept_id: "49436004", 
        description: "Atrial fibrillation",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-15T00:00:00Z",
    updated_at: "2024-03-10T00:00:00Z"
  },
  {
    id: 8,
    title: "Heart Failure Readmission Prevention",
    content: "What factors contribute to readmission rates in heart failure patients within 30 days of discharge?",
    analysis_summary: "Patients with comprehensive discharge planning and follow-up showed 50% lower readmission rates.",
    slicer_dicer_query: "SELECT patient_id, discharge_planning_score, follow_up_attendance, readmission_status FROM heart_failure_patients WHERE discharge_date >= DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH)",
    department_id: 3,
    department: mockDepartments[2],
    tags: [
      { 
        id: 73, 
        name: "Heart Failure", 
        snomed_concept_id: "84114007", 
        description: "A condition in which the heart is unable to pump enough blood to meet the body's needs",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 74, 
        name: "Readmission", 
        snomed_concept_id: "183932001", 
        description: "Hospital readmission",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-03-01T00:00:00Z",
    updated_at: "2024-03-15T00:00:00Z"
  },
  {
    id: 9,
    title: "Hypertension Control Patterns",
    content: "What are the patterns of blood pressure control in patients with resistant hypertension?",
    analysis_summary: "Patients on triple therapy with spironolactone showed 40% better blood pressure control.",
    slicer_dicer_query: "SELECT patient_id, medication_regimen, bp_measurements FROM hypertension_patients WHERE diagnosis = 'Resistant Hypertension'",
    department_id: 3,
    department: mockDepartments[2],
    tags: [
      { id: 13, name: "Hypertension", snomed_concept_id: "38341003", description: "Hypertension" },
      { id: 14, name: "Blood Pressure", snomed_concept_id: "75367002", description: "Blood pressure" }
    ],
    created_at: "2024-02-20T00:00:00Z",
    updated_at: "2024-03-12T00:00:00Z"
  },

  // Rehabilitation Questions
  {
    id: 10,
    title: "Cardiac Rehabilitation Program Outcomes",
    content: "What is the impact of our cardiac rehabilitation program on patient recovery and readmission rates?",
    analysis_summary: "Patients completing the 12-week program showed 60% lower readmission rates and improved quality of life scores.",
    slicer_dicer_query: "SELECT patient_id, program_completion, readmission_rate, quality_of_life_score FROM cardiac_rehab WHERE program_start_date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR)",
    department_id: 4,
    department: mockDepartments[3],
    tags: [
      { 
        id: 69, 
        name: "Cardiac Rehabilitation", 
        snomed_concept_id: "304252008", 
        description: "Cardiac rehabilitation program",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 70, 
        name: "Exercise Capacity", 
        snomed_concept_id: "248536006", 
        description: "Exercise capacity assessment",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 71, 
        name: "Stroke Rehabilitation", 
        snomed_concept_id: "304253003", 
        description: "Stroke rehabilitation program",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 72, 
        name: "Functional Recovery", 
        snomed_concept_id: "248536006", 
        description: "Functional recovery assessment",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-20T00:00:00Z",
    updated_at: "2024-03-12T00:00:00Z"
  },
  {
    id: 11,
    title: "Post-Stroke Rehabilitation Progress",
    content: "How effective is our intensive rehabilitation program for stroke patients in improving mobility scores?",
    analysis_summary: "Patients in the intensive program showed 45% greater improvement in mobility scores compared to standard care.",
    slicer_dicer_query: "SELECT patient_id, program_type, mobility_score_baseline, mobility_score_followup FROM stroke_rehab WHERE admission_date >= DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)",
    department_id: 4,
    department: mockDepartments[3],
    tags: [
      { 
        id: 65, 
        name: "Stroke Rehabilitation", 
        snomed_concept_id: "228153009", 
        description: "Stroke rehabilitation program",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 66, 
        name: "Functional Recovery", 
        snomed_concept_id: "183932001", 
        description: "Functional recovery assessment",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-25T00:00:00Z",
    updated_at: "2024-03-14T00:00:00Z"
  },
  {
    id: 12,
    title: "Orthopedic Rehabilitation Outcomes",
    content: "What is the impact of early mobilization on recovery time in post-orthopedic surgery patients?",
    analysis_summary: "Patients starting rehabilitation within 24 hours of surgery showed 30% faster recovery and 25% lower complication rates.",
    slicer_dicer_query: "SELECT patient_id, mobilization_time, recovery_duration, complication_rate FROM orthopedic_rehab WHERE surgery_date >= DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH)",
    department_id: 4,
    department: mockDepartments[3],
    tags: [
      { 
        id: 19, 
        name: "Orthopedic", 
        snomed_concept_id: "56459004", 
        description: "Orthopedic procedure",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 20, 
        name: "Mobilization", 
        snomed_concept_id: "225358003", 
        description: "Early mobilization",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-03-01T00:00:00Z",
    updated_at: "2024-03-15T00:00:00Z"
  },

  // Laboratory Medicine Questions
  {
    id: 13,
    title: "COVID-19 Test Turnaround Time",
    content: "What is the average turnaround time for COVID-19 PCR test results in our laboratory?",
    analysis_summary: "Average TAT improved from 24 hours to 12 hours after implementing new processing protocols.",
    slicer_dicer_query: "SELECT test_id, collection_time, result_time FROM lab_tests WHERE test_type = 'COVID-19 PCR'",
    department_id: 5,
    department: mockDepartments[4],
    tags: [
      { 
        id: 21, 
        name: "COVID-19", 
        snomed_concept_id: "840539006", 
        description: "COVID-19",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 22, 
        name: "Laboratory", 
        snomed_concept_id: "264362003", 
        description: "Laboratory procedure",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-01-20T00:00:00Z",
    updated_at: "2024-02-28T00:00:00Z"
  },
  {
    id: 14,
    title: "Blood Culture Contamination Rates",
    content: "What factors contribute to blood culture contamination rates in our emergency department?",
    analysis_summary: "Implementation of phlebotomy team reduced contamination rates by 40% compared to nurse-drawn samples.",
    slicer_dicer_query: "SELECT sample_id, collector_type, contamination_status FROM blood_cultures WHERE collection_date >= DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)",
    department_id: 5,
    department: mockDepartments[4],
    tags: [
      { 
        id: 23, 
        name: "Microbiology", 
        snomed_concept_id: "409822003", 
        description: "Microbiology",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 24, 
        name: "Contamination", 
        snomed_concept_id: "260413007", 
        description: "Specimen contamination",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-10T00:00:00Z",
    updated_at: "2024-03-05T00:00:00Z"
  },
  {
    id: 15,
    title: "Critical Value Reporting Time",
    content: "How quickly are critical laboratory values being reported to clinicians?",
    analysis_summary: "Implementation of automated alert system reduced reporting time from 45 minutes to 15 minutes.",
    slicer_dicer_query: "SELECT test_id, result_time, notification_time FROM critical_values WHERE result_date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH)",
    department_id: 5,
    department: mockDepartments[4],
    tags: [
      { 
        id: 25, 
        name: "Critical Value", 
        snomed_concept_id: "42425007", 
        description: "Critical laboratory value",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 26, 
        name: "Reporting", 
        snomed_concept_id: "225234004", 
        description: "Laboratory reporting",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-15T00:00:00Z",
    updated_at: "2024-03-10T00:00:00Z"
  },

  // Pediatrics Questions
  {
    id: 16,
    title: "Asthma Control in Children",
    content: "What factors influence asthma control in pediatric patients?",
    analysis_summary: "Regular use of controller medications and proper inhaler technique showed 60% better asthma control.",
    slicer_dicer_query: "SELECT patient_id, medication_adherence, inhaler_technique, asthma_control_score FROM pediatric_asthma WHERE age < 18",
    department_id: 6,
    department: mockDepartments[5],
    tags: [
      { 
        id: 27, 
        name: "Asthma", 
        snomed_concept_id: "195967001", 
        description: "Asthma",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 28, 
        name: "Pediatrics", 
        snomed_concept_id: "394576009", 
        description: "Pediatric care",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-03-01T00:00:00Z"
  },
  {
    id: 17,
    title: "Growth Monitoring Patterns",
    content: "What are the patterns of growth in children with growth hormone deficiency?",
    analysis_summary: "Children receiving growth hormone therapy showed catch-up growth within 6 months of treatment initiation.",
    slicer_dicer_query: "SELECT patient_id, height, weight, treatment_duration FROM growth_monitoring WHERE diagnosis = 'Growth Hormone Deficiency'",
    department_id: 6,
    department: mockDepartments[5],
    tags: [
      { 
        id: 29, 
        name: "Growth", 
        snomed_concept_id: "248153007", 
        description: "Growth assessment",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 30, 
        name: "Hormone", 
        snomed_concept_id: "267038008", 
        description: "Hormone therapy",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-15T00:00:00Z",
    updated_at: "2024-03-10T00:00:00Z"
  },
  {
    id: 18,
    title: "Vaccination Coverage Analysis",
    content: "What is the vaccination coverage rate for recommended childhood vaccines in our patient population?",
    analysis_summary: "Vaccination coverage improved by 25% after implementing reminder systems and education programs.",
    slicer_dicer_query: "SELECT patient_id, vaccine_type, administration_date FROM vaccinations WHERE age < 18 AND date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR)",
    department_id: 6,
    department: mockDepartments[5],
    tags: [
      { 
        id: 31, 
        name: "Vaccination", 
        snomed_concept_id: "33879002", 
        description: "Vaccination",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 32, 
        name: "Immunization", 
        snomed_concept_id: "33879002", 
        description: "Immunization",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-20T00:00:00Z",
    updated_at: "2024-03-12T00:00:00Z"
  },

  // Oncology Questions
  {
    id: 19,
    title: "Breast Cancer Treatment Response",
    content: "How do different chemotherapy regimens affect response rates in HER2-positive breast cancer?",
    analysis_summary: "Dual HER2-targeted therapy showed 40% better response rates compared to single-agent therapy.",
    slicer_dicer_query: "SELECT patient_id, treatment_regimen, response_rate, survival_time FROM breast_cancer WHERE subtype = 'HER2-positive'",
    department_id: 7,
    department: mockDepartments[6],
    tags: [
      { 
        id: 33, 
        name: "Breast Cancer", 
        snomed_concept_id: "254837009", 
        description: "Breast cancer",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 34, 
        name: "HER2", 
        snomed_concept_id: "423857001", 
        description: "HER2 positive",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-03-01T00:00:00Z"
  },
  {
    id: 20,
    title: "Lung Cancer Screening Outcomes",
    content: "What is the detection rate of early-stage lung cancer in our screening program?",
    analysis_summary: "Annual low-dose CT screening detected 80% of lung cancers at stage I or II.",
    slicer_dicer_query: "SELECT patient_id, screening_date, cancer_stage, detection_method FROM lung_cancer_screening WHERE screening_date >= DATE_SUB(CURRENT_DATE, INTERVAL 2 YEAR)",
    department_id: 7,
    department: mockDepartments[6],
    tags: [
      { 
        id: 35, 
        name: "Lung Cancer", 
        snomed_concept_id: "254637007", 
        description: "Lung cancer",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 36, 
        name: "Screening", 
        snomed_concept_id: "71388002", 
        description: "Cancer screening",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-15T00:00:00Z",
    updated_at: "2024-03-10T00:00:00Z"
  },
  {
    id: 21,
    title: "Colorectal Cancer Surveillance",
    content: "What is the optimal surveillance interval for colorectal cancer after curative resection?",
    analysis_summary: "Intensive surveillance in the first 3 years detected 90% of recurrences at resectable stages.",
    slicer_dicer_query: "SELECT patient_id, surveillance_interval, recurrence_status, detection_stage FROM crc_surveillance WHERE surgery_date >= DATE_SUB(CURRENT_DATE, INTERVAL 5 YEAR)",
    department_id: 7,
    department: mockDepartments[6],
    tags: [
      { 
        id: 37, 
        name: "Colorectal Cancer", 
        snomed_concept_id: "363406005", 
        description: "Colorectal cancer",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 38, 
        name: "Surveillance", 
        snomed_concept_id: "225234004", 
        description: "Cancer surveillance",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-20T00:00:00Z",
    updated_at: "2024-03-12T00:00:00Z"
  },

  // Gastroenterology Questions
  {
    id: 22,
    title: "IBD Treatment Response",
    content: "How effective are different biologic therapies in maintaining remission in Crohn's disease?",
    analysis_summary: "Combination therapy with immunomodulators showed 50% better remission maintenance compared to monotherapy.",
    slicer_dicer_query: "SELECT patient_id, treatment_type, remission_duration, flare_frequency FROM ibd_patients WHERE diagnosis = 'Crohn's Disease'",
    department_id: 8,
    department: mockDepartments[7],
    tags: [
      { 
        id: 39, 
        name: "IBD", 
        snomed_concept_id: "24526004", 
        description: "Inflammatory bowel disease",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 40, 
        name: "Biologic", 
        snomed_concept_id: "763158003", 
        description: "Biologic therapy",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-03-01T00:00:00Z"
  },
  {
    id: 23,
    title: "GERD Treatment Patterns",
    content: "What are the patterns of proton pump inhibitor use in patients with GERD?",
    analysis_summary: "Step-down therapy showed similar symptom control with 40% lower PPI usage compared to continuous therapy.",
    slicer_dicer_query: "SELECT patient_id, treatment_strategy, symptom_score, medication_usage FROM gerd_patients WHERE diagnosis = 'GERD'",
    department_id: 8,
    department: mockDepartments[7],
    tags: [
      { 
        id: 41, 
        name: "GERD", 
        snomed_concept_id: "235595009", 
        description: "Gastroesophageal reflux disease",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 42, 
        name: "PPI", 
        snomed_concept_id: "372665008", 
        description: "Proton pump inhibitor",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-15T00:00:00Z",
    updated_at: "2024-03-10T00:00:00Z"
  },
  {
    id: 24,
    title: "Liver Disease Progression",
    content: "What factors influence progression of non-alcoholic fatty liver disease?",
    analysis_summary: "Patients with metabolic syndrome showed 3x faster progression to fibrosis compared to those without.",
    slicer_dicer_query: "SELECT patient_id, metabolic_status, fibrosis_score, progression_rate FROM nafld_patients WHERE diagnosis = 'NAFLD'",
    department_id: 8,
    department: mockDepartments[7],
    tags: [
      { 
        id: 43, 
        name: "NAFLD", 
        snomed_concept_id: "197321007", 
        description: "Non-alcoholic fatty liver disease",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 44, 
        name: "Liver", 
        snomed_concept_id: "10200004", 
        description: "Liver disease",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-20T00:00:00Z",
    updated_at: "2024-03-12T00:00:00Z"
  },

  // Pulmonology Questions
  {
    id: 25,
    title: "COPD Exacerbation Prevention",
    content: "What interventions are most effective in preventing COPD exacerbations?",
    analysis_summary: "Combination of pulmonary rehabilitation and proper inhaler technique reduced exacerbations by 60%.",
    slicer_dicer_query: "SELECT patient_id, intervention_type, exacerbation_frequency, hospitalizations FROM copd_patients WHERE diagnosis = 'COPD'",
    department_id: 9,
    department: mockDepartments[8],
    tags: [
      { 
        id: 45, 
        name: "COPD", 
        snomed_concept_id: "13645005", 
        description: "Chronic obstructive pulmonary disease",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 46, 
        name: "Exacerbation", 
        snomed_concept_id: "195967001", 
        description: "Disease exacerbation",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-03-01T00:00:00Z"
  },
  {
    id: 26,
    title: "Asthma Control Assessment",
    content: "How effective is our asthma control assessment tool in predicting exacerbations?",
    analysis_summary: "ACT scores < 20 predicted 80% of exacerbations within the next 3 months.",
    slicer_dicer_query: "SELECT patient_id, act_score, exacerbation_status, follow_up_date FROM asthma_patients WHERE assessment_date >= DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)",
    department_id: 9,
    department: mockDepartments[8],
    tags: [
      { 
        id: 47, 
        name: "Asthma", 
        snomed_concept_id: "195967001", 
        description: "Asthma",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 48, 
        name: "Control", 
        snomed_concept_id: "225234004", 
        description: "Disease control",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-15T00:00:00Z",
    updated_at: "2024-03-10T00:00:00Z"
  },
  {
    id: 27,
    title: "Pulmonary Function Trends",
    content: "What are the long-term trends in pulmonary function in patients with interstitial lung disease?",
    analysis_summary: "Annual decline in FVC was 200ml in untreated patients compared to 50ml in those on antifibrotic therapy.",
    slicer_dicer_query: "SELECT patient_id, fvc_measurements, treatment_status, follow_up_duration FROM ild_patients WHERE diagnosis = 'Interstitial Lung Disease'",
    department_id: 9,
    department: mockDepartments[8],
    tags: [
      { 
        id: 49, 
        name: "ILD", 
        snomed_concept_id: "233703007", 
        description: "Interstitial lung disease",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 50, 
        name: "PFT", 
        snomed_concept_id: "16932000", 
        description: "Pulmonary function test",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-20T00:00:00Z",
    updated_at: "2024-03-12T00:00:00Z"
  },

  // Nephrology Questions
  {
    id: 28,
    title: "Dialysis Access Outcomes",
    content: "What factors influence the patency rates of arteriovenous fistulas in hemodialysis patients?",
    analysis_summary: "Preoperative vein mapping and surgeon experience showed 40% better primary patency rates.",
    slicer_dicer_query: "SELECT patient_id, access_type, patency_duration, complication_rate FROM dialysis_access WHERE creation_date >= DATE_SUB(CURRENT_DATE, INTERVAL 2 YEAR)",
    department_id: 10,
    department: mockDepartments[9],
    tags: [
      { 
        id: 51, 
        name: "Dialysis", 
        snomed_concept_id: "399270008", 
        description: "Hemodialysis",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 52, 
        name: "Access", 
        snomed_concept_id: "257316003", 
        description: "Vascular access",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-01T00:00:00Z",
    updated_at: "2024-03-01T00:00:00Z"
  },
  {
    id: 29,
    title: "CKD Progression Analysis",
    content: "What are the risk factors for rapid progression of chronic kidney disease?",
    analysis_summary: "Proteinuria > 1g/day and uncontrolled hypertension were associated with 3x faster eGFR decline.",
    slicer_dicer_query: "SELECT patient_id, proteinuria_level, bp_control, egfr_trend FROM ckd_patients WHERE diagnosis = 'Chronic Kidney Disease'",
    department_id: 10,
    department: mockDepartments[9],
    tags: [
      { 
        id: 53, 
        name: "CKD", 
        snomed_concept_id: "709044004", 
        description: "Chronic kidney disease",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 54, 
        name: "Progression", 
        snomed_concept_id: "260413007", 
        description: "Disease progression",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-15T00:00:00Z",
    updated_at: "2024-03-10T00:00:00Z"
  },
  {
    id: 30,
    title: "AKI Recovery Patterns",
    content: "What factors influence recovery from acute kidney injury in hospitalized patients?",
    analysis_summary: "Early nephrology consultation and volume optimization showed 50% better renal recovery rates.",
    slicer_dicer_query: "SELECT patient_id, consultation_timing, volume_status, recovery_status FROM aki_patients WHERE admission_date >= DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH)",
    department_id: 10,
    department: mockDepartments[9],
    tags: [
      { 
        id: 55, 
        name: "AKI", 
        snomed_concept_id: "14669001", 
        description: "Acute kidney injury",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 56, 
        name: "Recovery", 
        snomed_concept_id: "260413007", 
        description: "Renal recovery",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-02-20T00:00:00Z",
    updated_at: "2024-03-12T00:00:00Z"
  },

  // Add new cross-department question
  {
    id: 31,
    title: "Heart Attack Recovery Journey: From Acute Care to Rehabilitation",
    content: "How does early cardiac rehabilitation impact long-term recovery and readmission rates in heart attack patients?",
    analysis_summary: "Analysis shows that patients who start cardiac rehabilitation within 2 weeks of their heart attack have 40% lower readmission rates and 50% better functional recovery at 6 months compared to those who start later.",
    slicer_dicer_query: `
      SELECT 
        p.patient_id,
        p.heart_attack_date,
        p.rehab_start_date,
        p.initial_ejection_fraction,
        p.six_month_ejection_fraction,
        p.readmission_status,
        p.functional_capacity_score,
        p.quality_of_life_score
      FROM heart_attack_patients p
      WHERE p.heart_attack_date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR)
      ORDER BY p.rehab_start_date
    `,
    department_id: 3, // Primary department: Cardiology
    department: mockDepartments[2],
    tags: [
      { 
        id: 63, 
        name: "Myocardial Infarction", 
        snomed_concept_id: "22298006", 
        description: "Heart attack",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 64, 
        name: "Cardiac Rehabilitation", 
        snomed_concept_id: "304252008", 
        description: "Cardiac rehabilitation program",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 65, 
        name: "Exercise Capacity", 
        snomed_concept_id: "248536006", 
        description: "Exercise capacity assessment",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      },
      { 
        id: 66, 
        name: "Quality of Life", 
        snomed_concept_id: "248536006", 
        description: "Quality of life assessment",
        created_at: "2024-03-01T00:00:00Z",
        updated_at: "2024-03-15T00:00:00Z",
        severity: 1
      }
    ],
    created_at: "2024-03-01T00:00:00Z",
    updated_at: "2024-03-15T00:00:00Z"
  }
]; 