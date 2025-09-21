import fetch from 'node-fetch';

// Test script for signup endpoint
async function testSignup() {
  const baseUrl = 'http://localhost:5000';
  
  console.log('🧪 Testing Signup Endpoint...\n');
  
  // Test cases
  const testCases = [
    {
      name: 'Valid Signup',
      data: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      },
      expected: 'success'
    },
    {
      name: 'Missing Fields',
      data: {
        username: '',
        email: '',
        password: ''
      },
      expected: 'validation error'
    },
    {
      name: 'Invalid Email',
      data: {
        username: 'testuser2',
        email: 'invalid-email',
        password: 'password123'
      },
      expected: 'validation error'
    },
    {
      name: 'Short Password',
      data: {
        username: 'testuser3',
        email: 'test3@example.com',
        password: '123'
      },
      expected: 'validation error'
    },
    {
      name: 'Duplicate Email',
      data: {
        username: 'testuser4',
        email: 'test@example.com', // Same as first test
        password: 'password123'
      },
      expected: 'duplicate error'
    }
  ];
  
  for (const testCase of testCases) {
    console.log(`📝 Testing: ${testCase.name}`);
    
    try {
      const response = await fetch(`${baseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.data)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        console.log(`✅ Success: ${result.msg}`);
        if (result.otp) {
          console.log(`   OTP: ${result.otp}`);
        }
      } else {
        console.log(`❌ Error: ${result.msg}`);
      }
      
    } catch (error) {
      console.log(`💥 Network Error: ${error.message}`);
    }
    
    console.log(''); // Empty line for readability
  }
  
  console.log('🎉 Signup testing complete!');
}

// Run the test
testSignup().catch(console.error);
