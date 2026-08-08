import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    "/api/drawing/random": async () => {
      const drawingsFile = new URL(
        "./assets/DrawingsDescription.json",
        import.meta.url,
      );
      const drawingsJson = await Bun.file(drawingsFile).text();
      const drawings = JSON.parse(drawingsJson);

      if (!Array.isArray(drawings) || drawings.length === 0) {
        return new Response(
          JSON.stringify({ error: "No drawings available" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      const randomIndex = Math.floor(Math.random() * drawings.length);
      const drawing = drawings[randomIndex];
      const imageFile = new URL(
        `./assets/DrawingsImages/${drawing.name}.png`,
        import.meta.url,
      );
      const imageBuffer = await Bun.file(imageFile).arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString("base64");
      const responseBody = {
        name: drawing.name,
        description: drawing.description,
        image: `data:image/png;base64,${base64Image}`,
      };

      return new Response(JSON.stringify(responseBody), {
        headers: { "Content-Type": "application/json" },
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
