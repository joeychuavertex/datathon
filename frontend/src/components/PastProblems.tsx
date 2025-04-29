import { Card, Title, Text, Stack, Group, Badge, Tooltip } from '@mantine/core';

interface ProblemStatement {
  id: number;
  title: string;
  statement: string;
  date: string;
  tags: string[];
  snomedCodes: {
    code: string;
    description: string;
  }[];
}

const mockProblems: ProblemStatement[] = [
  {
    id: 1,
    title: "Pressure Ulcer Prevention",
    statement: "The [Adult inpatients at high risk of pressure ulcers] at [Singapore General Hospital, Ward 5A] are experiencing [suboptimal adherence to the National Pressure Ulcer Prevention Guideline] as evidenced by [a 15% incidence rate of hospital-acquired pressure ulcers (Stage 2 or higher) in the past quarter, exceeding the hospital's target of 10% and deviating from the guideline's recommendation for consistent use of pressure-relieving devices and repositioning protocols]. This is contributing to [increased patient discomfort and pain, prolonged hospital stays, higher costs associated with wound care, and potential for nosocomial infections] and is likely influenced by [heavy nursing workload, inconsistent availability of appropriate pressure-relieving equipment, and variable staff knowledge and adherence to the guideline's specific recommendations on risk assessment and preventative measures].",
    date: "2024-03-15",
    tags: ["Pressure Ulcers", "Patient Safety", "Nursing Care"],
    snomedCodes: [
      { code: "399954006", description: "Pressure ulcer" },
      { code: "71388002", description: "Procedure on skin" },
      { code: "385763004", description: "Wound care" },
      { code: "385765001", description: "Wound dressing" }
    ]
  },
  {
    id: 2,
    title: "VTE Prophylaxis",
    statement: "The [Adult medical inpatients with identified risk factors for VTE] at [Changi General Hospital, Medical Wards] are experiencing [inconsistent prescription and administration of pharmacological and mechanical VTE prophylaxis as recommended by the MOH Clinical Practice Guidelines on VTE Prevention] as evidenced by [a recent audit showing only 70% of eligible patients receiving appropriate prophylaxis within 24 hours of admission, falling short of the guideline's target of >95%]. This is contributing to [an increased risk of deep vein thrombosis and pulmonary embolism, potentially leading to significant morbidity and mortality, and increased length of stay and healthcare costs] and is likely influenced by [incomplete VTE risk assessments upon admission, lack of standardized order sets within the electronic health record, and insufficient awareness among junior doctors regarding the specific risk stratification and prophylaxis recommendations in the national guidelines].",
    date: "2024-03-10",
    tags: ["VTE", "Medication Safety", "Clinical Guidelines"],
    snomedCodes: [
      { code: "128053003", description: "Deep vein thrombosis" },
      { code: "59282003", description: "Pulmonary embolism" },
      { code: "384810007", description: "Anticoagulant therapy" },
      { code: "385763004", description: "Thromboprophylaxis" }
    ]
  },
  {
    id: 3,
    title: "Antibiotic Stewardship",
    statement: "The [Adult inpatients with suspected lower respiratory tract infections] at [Tan Tock Seng Hospital, Respiratory Medicine Department] are experiencing [potential overuse of broad-spectrum antibiotics that is not fully aligned with the National Antimicrobial Resistance Control Programme guidelines for empiric therapy] as evidenced by [a review of antibiotic prescriptions showing that broad-spectrum antibiotics are initiated in 60% of cases without documented justification for not using narrower-spectrum agents as per the guideline]. This is contributing to [the potential for increased antimicrobial resistance, higher risk of Clostridium difficile infection, and unnecessary healthcare costs] and is likely influenced by [prescriber uncertainty in differentiating bacterial from viral infections, a culture of defaulting to broad-spectrum coverage for perceived higher risk, and potentially insufficient real-time feedback on antibiotic prescribing patterns aligned with the national guidelines].",
    date: "2024-03-05",
    tags: ["Antibiotics", "Infection Control", "Medication Safety"],
    snomedCodes: [
      { code: "3738000", description: "Antibiotic therapy" },
      { code: "40733004", description: "Infectious disease" },
      { code: "276580006", description: "Antimicrobial resistance" },
      { code: "87628006", description: "Bacterial infection" }
    ]
  },
  {
    id: 4,
    title: "Post-Surgery Pain Management",
    statement: "The [Adult inpatients following major abdominal surgery] at [Khoo Teck Puat Hospital, Surgical Wards] are experiencing [suboptimal pain control as indicated by inconsistent use of multimodal analgesia and reliance on as-needed opioid medications, deviating from best practice guidelines for postoperative pain management] as evidenced by [patient-reported pain scores frequently exceeding 4/10 at rest and 6/10 with movement, and a low utilization rate of scheduled non-opioid analgesics documented in medication charts]. This is contributing to [impaired patient recovery, reduced mobility, increased risk of postoperative complications, and decreased patient satisfaction] and is likely influenced by [lack of standardized postoperative pain management protocols across surgical teams, inadequate patient education on pain management options, and potential reluctance among some staff to consistently implement multimodal analgesic strategies].",
    date: "2024-03-01",
    tags: ["Pain Management", "Postoperative Care", "Patient Comfort"],
    snomedCodes: [
      { code: "274663001", description: "Postoperative pain" },
      { code: "3738000", description: "Analgesic therapy" },
      { code: "182895007", description: "Pain assessment" },
      { code: "182894006", description: "Pain management" }
    ]
  }
];

const HighlightedText = ({ text }: { text: string }) => {
  const parts = text.split(/(\[.*?\])/);
  
  return (
    <Text>
      {parts.map((part, index) => {
        if (part.startsWith('[') && part.endsWith(']')) {
          return (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded font-medium"
            >
              {part.slice(1, -1)}
            </span>
          );
        }
        return part;
      })}
    </Text>
  );
};

const PastProblems = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Title order={2} className="mb-6">Past Problem Statements</Title>
      
      <Stack spacing="md">
        {mockProblems.map((problem) => (
          <Card key={problem.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Group position="apart" mb="xs">
              <Title order={3}>{problem.title}</Title>
              <Text size="sm" color="dimmed">{problem.date}</Text>
            </Group>
            
            <Group spacing="xs" mb="md">
              {problem.tags.map((tag) => (
                <Badge key={tag} color="blue" variant="light">
                  {tag}
                </Badge>
              ))}
            </Group>

            <Group spacing="xs" mb="md">
              {problem.snomedCodes.map((code) => (
                <Tooltip
                  key={code.code}
                  label={`${code.code}: ${code.description}`}
                  position="bottom"
                  withArrow
                >
                  <Badge color="green" variant="light">
                    SNOMED: {code.code}
                  </Badge>
                </Tooltip>
              ))}
            </Group>
            
            <HighlightedText text={problem.statement} />
          </Card>
        ))}
      </Stack>
    </div>
  );
};

export default PastProblems; 