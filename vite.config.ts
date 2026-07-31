import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

// Custom Vite plugin to handle site data, image uploads, and contact form submissions
const siteDataSavePlugin = () => ({
  name: "site-data-save-plugin",
  configureServer(server: any) {
    // API 1: Save JSON Data to public/data/siteData.json
    server.middlewares.use(
      "/api/save-data",
      (req: any, res: any, next: any) => {
        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk: any) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            try {
              const parsed = JSON.parse(body);
              const targetPath = path.resolve(
                __dirname,
                "public/data/siteData.json",
              );
              fs.mkdirSync(path.dirname(targetPath), { recursive: true });
              fs.writeFileSync(
                targetPath,
                JSON.stringify(parsed, null, 2),
                "utf-8",
              );
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  success: true,
                  message: "Məlumatlar yadda saxlanıldı",
                }),
              );
            } catch (error: any) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  success: false,
                  error: error?.message || "Xəta baş verdi",
                }),
              );
            }
          });
        } else {
          next();
        }
      },
    );

    // API 2: Dynamic Upload Endpoint for files (public/uploads/)
    server.middlewares.use(
      "/api/upload-image",
      (req: any, res: any, next: any) => {
        if (req.method === "POST") {
          let body = "";
          req.on("data", (chunk: any) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            try {
              const { fileData, fileName, previousUrl, isFavicon } =
                JSON.parse(body);
              if (!fileData) {
                throw new Error("Fayl tapılmadı");
              }

              const matches = fileData.match(/^data:(.+);base64,(.+)$/);
              let ext = "png";
              let base64Data = fileData;

              if (matches && matches.length === 3) {
                const mime = matches[1];
                base64Data = matches[2];
                if (mime.includes("svg")) ext = "svg";
                else if (mime.includes("jpeg") || mime.includes("jpg"))
                  ext = "jpg";
                else if (mime.includes("webp")) ext = "webp";
                else if (mime.includes("ico") || mime.includes("x-icon"))
                  ext = "ico";
              }

              let localUrl = "";

              if (isFavicon) {
                const publicDir = path.resolve(__dirname, "public");
                [
                  "favicon.ico",
                  "favicon.png",
                  "favicon.svg",
                  "favicon.webp",
                ].forEach((favName) => {
                  const existingFav = path.join(publicDir, favName);
                  if (fs.existsSync(existingFav)) {
                    try {
                      fs.unlinkSync(existingFav);
                    } catch (e) {
                      console.warn("Köhnə favicon silinərkən xəta:", e);
                    }
                  }
                });

                const newFavName = `favicon.${ext}`;
                const newFavPath = path.join(publicDir, newFavName);
                fs.writeFileSync(newFavPath, Buffer.from(base64Data, "base64"));
                localUrl = `/${newFavName}?v=${Date.now()}`;
              } else {
                if (previousUrl && previousUrl.includes("/uploads/")) {
                  const cleanPrevPath = previousUrl.split("?")[0];
                  const oldPath = path.resolve(
                    __dirname,
                    "public",
                    cleanPrevPath.replace(/^\//, ""),
                  );
                  if (fs.existsSync(oldPath)) {
                    try {
                      fs.unlinkSync(oldPath);
                    } catch (e) {
                      console.warn("Köhnə fayl silinərkən xəta:", e);
                    }
                  }
                }

                const safeName = (fileName || "file")
                  .replace(/[^a-z0-9]/gi, "_")
                  .toLowerCase();
                const uniqueFilename = `${Date.now()}_${safeName}.${ext}`;

                const uploadsDir = path.resolve(__dirname, "public/uploads");
                fs.mkdirSync(uploadsDir, { recursive: true });

                const filePath = path.join(uploadsDir, uniqueFilename);
                fs.writeFileSync(filePath, Buffer.from(base64Data, "base64"));
                localUrl = `/uploads/${uniqueFilename}`;
              }

              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: true, url: localUrl }));
            } catch (error: any) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  success: false,
                  error: error?.message || "Xəta baş verdi",
                }),
              );
            }
          });
        } else {
          next();
        }
      },
    );
  },
});

export default defineConfig({
  plugins: [react(), siteDataSavePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
