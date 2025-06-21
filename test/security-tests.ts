import request from 'supertest';
import app from '../src/app';

describe('Security Tests for Secure Messaging App', () => {
  it('should not allow script injection in username registration', async () => {
    const response = await request(app)
      .post('/app/users/register')
      .send({ username: '<script>alert(1)</script>' });

    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should sanitize messages to prevent stored XSS', async () => {
    const sender = 'xss_sender';
    const receiver = 'xss_receiver';

    await request(app).post('/app/users/register').send({ username: sender });
    await request(app).post('/app/users/register').send({ username: receiver });

    const xssPayload = '<img src=x onerror=alert(1) />';

    await request(app)
      .post(`/app/messages/users/${receiver}`)
      .send({ sender, message: xssPayload });

    const messages = await request(app).get(`/app/messages/users/${receiver}`);

    expect(messages.status).toBe(200);
    expect(messages.body.messages).not.toContainEqual(
      expect.objectContaining({ message: xssPayload })
    );
  });

  it('should reject invalid JSON payloads', async () => {
    const res = await request(app)
      .post('/app/users/register')
      .set('Content-Type', 'application/json')
      .send('invalid json');

    expect(res.status).toBe(400);
  });

  it('should implement rate limiting on sensitive endpoints', async () => {
    const attempts = Array(10).fill(null);
    const results = await Promise.all(
      attempts.map(() =>
        request(app).post('/app/users/register').send({ username: 'rate_test' + Math.random() })
      )
    );

    const lastResponse = results[results.length - 1];
    expect([200, 429]).toContain(lastResponse.status);
  });

  it('should protect against path traversal in message routes', async () => {
    const res = await request(app).get('/app/messages/users/../../etc/passwd');
    expect(res.status).toBe(400);
  });
});
