import React from 'react';
import {
  Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, Tooltip
} from 'recharts';

// Haqiqiy ma'lumotlar strukturasi
const data = [
  { subject: 'Linux', value: 95, fullMark: 100 },
  { subject: 'DevOps', value: 85, fullMark: 100 },
  { subject: 'JavaScript', value: 90, fullMark: 100 },
  { subject: 'Python', value: 65, fullMark: 100 },
  { subject: 'Web Security', value: 80, fullMark: 100 },
  { subject: 'Mobile (Swift)', value: 45, fullMark: 100 },
  { subject: 'Database', value: 75, fullMark: 100 },
  { subject: 'C++', value: 88, fullMark: 100 },
  { subject: 'Algorithms', value: 70, fullMark: 100 },
  { subject: 'Cloud (AWS)', value: 60, fullMark: 100 },
];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#1f2937',
        border: '1px solid #10b981',
        padding: '10px',
        borderRadius: '8px',
        color: '#fff',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
      }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{payload[0].payload.subject}</p>
        <p style={{ margin: 0, color: '#10b981' }}>Daraja: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const AdvancedSkillRadar = () => {
  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '800px',
      height: '600px', 
      backgroundColor: '#0f172a', // Rasmga yaqinroq chuqur rang
      borderRadius: '24px',
      padding: '40px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      position: 'relative'
    }}>
      <h3 style={{ 
        color: '#f8fafc', 
        fontFamily: 'Inter, sans-serif',
        marginBottom: '20px',
        textAlign: 'center',
        letterSpacing: '1px'
      }}>
        PROFESSIONAL SKILLS MATRIX
      </h3>
      
      <ResponsiveContainer width="100%" height="90%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          {/* O'rgimchak to'ri dizayni */}
          <PolarGrid stroke="#334155" strokeWidth={0.5} />
          
          {/* Aylana bo'ylab yozuvlar */}
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 500 }} 
          />
          
          {/* Daraja chiziqlari (ko'rinmas qilsa ham bo'ladi) */}
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          
          <Tooltip content={<CustomTooltip />} />
          
          {/* Asosiy grafik qismi */}
          <Radar
            name="Level"
            dataKey="value"
            stroke="#10b981"
            strokeWidth={3}
            fill="#10b981"
            fillOpacity={0.15}
            animationBegin={300}
            animationDuration={1500}
            isAnimationActive={true}
          />
          
          {/* Effekt uchun qo'shimcha qatlam (Glow effekti) */}
          <Radar
            dataKey="value"
            stroke="#10b981"
            strokeWidth={1}
            fill="transparent"
            strokeOpacity={0.5}
            dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Rasmda bor bo'lgan o'ng tarafdagi kabi strelka belgisi (dekorativ) */}
      <div style={{ position: 'absolute', top: '20px', right: '30px', color: '#94a3b8' }}>
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
        </svg>
      </div>
    </div>
  );
};

export default AdvancedSkillRadar;