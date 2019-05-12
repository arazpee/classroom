const request = require('supertest');
const app = require('../app');
const {
  beforeEach,
  user1,
  user3,
  classroom1,
  afterEach
} = require('./helperTest/db');
const User = require('../models/User');
const ClassRoom = require('../models/ClassRoom');

jest.setTimeout(30000);
beforeEach(beforeEach);
afterEach(afterEach);

describe('sign up', () => {
  test('sign up and should get 201 and content has information', async () => {
    const response = await request(app).post('/signup')
      .send({
        email: 'pee@gmail.com',
        password: '12345asds!!',
        positions: 'teacher',
        name: 'Bale'
      })
      .expect(201);

    expect(response.body).not.toBeNull();
  });

  test('should have data in mongoose', async () => {
    const data = await User.findOne({ email: 'pee@gmail.com'});
    expect(data).not.toBeNull();
  })
});

describe('sign in user', () => {
  test('should get code 401 when no Authorization header', async () => {
    const response = await request(app).get("/secret")
      .set('Authorization', 'Bearer asdfsdfdfwer13412')
      .send()
      .expect(401);
  });

  test('sign in and have token and then have permission to view in secret route', async () => {
    const response = await request(app).post("/signin")
      .send({
        email: 'mike@example.com',
        password: '1234567!'
      })
      expect(200);

    //should have body response
    expect(response.body).not.toBeNull();
    //should have an authorization
    const data = await request(app).get('/secret')
      .set('Authorization', `Bearer ${response.body.token}`)
      .send()
      .expect(200);
  })

  test('should not sign in when using fault password', async () => {
    const response = await request(app).post('/signin')
      .send({
        email: 'mike@example.com',
        password: 'asdfsadfsdff'
      })
      .expect(401);
  });
});

describe('class test', () => {
  test('should not add class by student', async () => {
    const response = await request(app).post("/signin")
      .send({
        email: 'bally@example.com',
        password: '1234567!'
      })
      .expect(200);


    const createdClass = await request(app).post('/addClass')
      .set('Authorization', `Bearer ${JSON.parse(response.text).token}`)
      .send({
        name: 'math',
        description: 'linear'
      })
      .expect(401);

      expect(JSON.parse(createdClass.error.text).error).toEqual("you don't have permission student!");
  });

  test('should add class by only teacher', async () => {
    const response = await request(app).post('/signin')
      .send({
        email: "boy@gmail.com",
        password: "12321333t"
      })
      .expect(200);

    const createdClass = await request(app).post('/addClass')
      .set('Authorization', `Bearer ${JSON.parse(response.text).token}`)
      .send({
        name: "math",
        description: "liner algebra"
      })
      .expect(201);
  });

  test('should show all classRoom', async () => {
    const response = await request(app).get('/classroom')
      .send({})
      .expect(200);

    expect(response).not.toBeNull();
  })

  describe('/search', () => {
    test('should get informations when searching', async () => {
      const response = await request(app).get('/search')
        .query({
          name: 'bale'
        })
        .expect(200);
    });

    test('should get correct informations when searching', async () => {
      const response = await request(app).get('/search')
        .query({
          name: 'science'
        })
        .expect(200);

      const toStingJson = JSON.parse(response.text);
      expect(toStingJson[0].name).toBe("Science");
    });
  })
});

describe('/edit', () => {
  test('should not edit class room when no authentication', async () => {
    const response = await request(app).put(`/update/classroom/${classroom1._id}`)
      .send({
        name: "Math",
        description: "This is Math"
      })
      .expect(401);

  });
  test('student don\'t have permission to edit', async () => {
    const response = await request(app).put(`/update/classroom/${classroom1._id}`)
      .set('Authorization', `Bearer ${user1.tokens[0]}`)
      .send({
        name: "Math",
        description: "This is Math"
      })
      .expect(401);

  });
  test('should edit class room', async () => {
    const response = await request(app).put(`/update/classroom/${classroom1._id}`)
      .set('Authorization', `Bearer ${user3.tokens[0]}`)
      .send({
        name: "Math",
        description: "This is Math"
      })
      .expect(200);

  });
  test('then it should have correct classroom', async () => {
    const classRoom = await ClassRoom.findOne({ _id: classroom1._id });
    expect(classRoom.name).toBe("Math");
  });
});

describe('/delete', () => {
  test('should delete class room', async () => {
    const response = await request(app).delete(`/delete/${classroom1._id}`)
      .expect(200);
  })
})
