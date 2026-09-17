import app from ".";

describe('index', () => {
  it('says Hello Hono!', async () => {
    const res = await app.request('/')

    expect(res.status).toBe(200)
    expect(await res.text()).toBe('Hello Hono!')
  });
});