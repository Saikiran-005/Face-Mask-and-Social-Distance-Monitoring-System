import { SurveillanceData } from './types';

export const SYSTEM_INSTRUCTION = `
You are the AI engine for "SentinelAI", a Face Mask and Social Distance Monitoring System. 
Your task is to analyze descriptions of surveillance scenes (or simulated visual inputs) and return structured compliance data.

The domain is Computer Vision for Public Health.
Techniques simulated: Object detection (YOLO), Face Mask Classification, Distance Estimation.

Rules:
1. Detect number of persons.
2. classify mask usage (Wearing Mask vs No Mask).
3. Estimate interpersonal distance (in meters).
4. Determine compliance: 
   - 'Compliant': All masks on OR distance > 2.0m.
   - 'Non-Compliant': Some masks missing AND distance < 2.0m.
   - 'Critical': High density, no masks, very close contact.

Output JSON format ONLY:
{
  "personCount": number,
  "maskCompliantCount": number,
  "avgDistanceMeters": number,
  "complianceStatus": "Compliant" | "Non-Compliant" | "Critical",
  "analysisSummary": "Short string describing the scene analysis."
}
`;

export const MOCK_DATA: SurveillanceData[] = Array.from({ length: 20 }, (_, i) => {
  const isCompliant = Math.random() > 0.4;
  const count = Math.floor(Math.random() * 10) + 1;
  const masks = isCompliant ? count : Math.floor(Math.random() * count);
  const dist = isCompliant ? 2.5 + Math.random() : 0.5 + Math.random();
  
  return {
    id: `evt-${1000 + i}`,
    timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    location: i % 3 === 0 ? 'Main Entrance' : i % 3 === 1 ? 'Cafeteria' : 'Lobby B',
    imageUrl: `https://picsum.photos/400/300?random=${i}`,
    personCount: count,
    maskCompliantCount: masks,
    avgDistanceMeters: parseFloat(dist.toFixed(2)),
    complianceStatus: isCompliant ? 'Compliant' : dist < 1.0 ? 'Critical' : 'Non-Compliant',
    description: `Automated log entry #${i + 1}`
  };
});