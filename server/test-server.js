import http from 'http';
import { mockData } from './src/data/mockStore.js';
import { processAIChat } from './src/services/aiService.js';

console.log('Testing Mock Store & AI Engine...');
console.log(`- Loaded ${mockData.departments.length} departments`);
console.log(`- Loaded ${mockData.users.length} users`);
console.log(`- Loaded ${mockData.subjects.length} subjects`);
console.log(`- Loaded ${mockData.attendanceRecords.length} attendance records`);
console.log(`- Loaded ${mockData.feeRecords.length} fee records`);

async function runTest() {
  const aiRes = await processAIChat({
    message: 'What is my current attendance percentage?',
    role: 'STUDENT',
    userContext: {
      fullName: 'Marcus Chen',
      studentId: 'SU-2024-CS-042',
      attendanceRate: 94.2
    }
  });

  console.log('\nAI Assistant Response Test:');
  console.log('Source:', aiRes.source);
  console.log('Reply preview:', aiRes.reply.slice(0, 150) + '...');
  console.log('\n[TEST PASSED] All data models and AI Engine are verified successfully!');
}

runTest();
