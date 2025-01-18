const request = require('supertest');
const app = require('../index.js');  


describe('API Routes', () => {
  
  // Test 1: Check if /api/search/users endpoint works
  it('should return 200 for /api/search/users', async () => {
    const response = await request(app).get('/api/search/users?q=octocat').expect(200);
  });

  // Test 2: Check if /api/users/:username endpoint works
  it('should return 200 for /api/users/octocat', async () => {
    const response = await request(app).get('/api/users/octocat').expect(200);
  });

  // Test 3: Check if /api/users/:username/repos works
  it('should return 200 for /api/users/octocat/repos', async () => {
    const response = await request(app).get('/api/users/octocat/repos').expect(200);
  });

  // Test 4: Check if /api/repos/:owner/:repo/commits works
  it('should return 200 for /api/repos/octocat/Hello-World/commits', async () => {
    const response = await request(app).get('/api/repos/octocat/Hello-World/commits').expect(200);
  });

});