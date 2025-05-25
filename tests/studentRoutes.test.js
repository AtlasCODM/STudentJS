const request = require('supertest');
const app = require('../server'); // adjust if your app export is separate
const mongoose = require('mongoose');
const Student = require('../models/Student'); // adjust path if needed
const jwt = require('jsonwebtoken');

// Mock JWT token (replace with real if needed)
const token = jwt.sign({ id: 'admin123' }, process.env.JWT_SECRET || 'secret', {
  expiresIn: '1h'
});

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Student API Tests 🧪', () => {
  let studentId;

  it('POST /api/students ➕ should add new student', async () => {1
    const res = await request(app)
      .post('/api/students')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Student',
        email: 'student@example.com',
        age: 21,
        course: 'Computer Science',
        password: 'strongpassword123'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe('Test Student');
    studentId = res.body._id;
  });

  it('GET /api/students 📋 should return all students', async () => {
    const res = await request(app)
      .get('/api/students')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('GET /api/students/:id 🔍 should return one student', async () => {
    const res = await request(app)
      .get(`/api/students/${studentId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body._id).toBe(studentId);
  });

  it('PUT /api/students/:id ✏️ should update a student', async () => {
    const res = await request(app)
      .put(`/api/students/${studentId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ age: 22 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.age).toBe(22);
  });

  it('DELETE /api/students/:id ❌ should delete a student', async () => {
    const res = await request(app)
      .delete(`/api/students/${studentId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Student deleted');
  });
});
