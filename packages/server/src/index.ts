import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/save-file", async (c) => {
  const { file_name } = c.req.query();
  const blob = await c.req.blob();
  const file = Bun.file(`./${file_name}`);
  if (await file.exists()) {
    return c.json({ ok: false });
  }

  await Bun.write(file, blob);
  return c.json({ ok: true });
});

export default app;
