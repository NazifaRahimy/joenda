import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import http from "http";
import { Server } from "socket.io";

    const app = express();

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // تنظیمات ذخیره‌سازی multer:
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.join(__dirname, 'uploads');
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + '-' + file.originalname);
        }
    });

   const upload = multer({ storage });

    // app.use(cors());

    // app.use(
    //     cors({
    //         origin: "https://joenda.netlify.app",
    //         methods: ["GET", "POST", "PUT", "DELETE"],
    //     })
    // );


    app.use(cors({ origin: "*" }));

//     app.use(
//   cors({
//     origin: [
//       "https://joenda.netlify.app",
//       "https://joyenda-server.onrender.com"
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"]
//   })
// );


    app.use(express.json());

    app.post('/login', (req, res) => {
        // const {userName, password}= req.body;
        const { email, password } = req.body;
        console.log("Login route called 👌");
        res.send({
            token: "test123",
            user: {
                name: email,
                email: email,
            }
        })
    })


    app.post('/register', (req, res) => {
        const { first_name, last_name, email, password, confirm_password } = req.body;
        console.log("Register route called");

        // پاسخ همراه با token و نام کامل
        res.send({
            success: true,
            token: "test123",
            user: {
                name: `${first_name} ${last_name}`,
                email: email // 👈 اضافه شد
            }
        });
    });


    // برای serve کردن فایل‌های آپلود شده به صورت static
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    let ads = [];

    app.post('/ads', upload.array('images'), (req, res) => {
        const adData = req.body;
        const files = req.files;
        // یک id واحد برای آگهی و تصاویر
        const adId = Date.now();
        const images = files.map(file => ({
            url: `/uploads/${file.filename}`,
            id: adId       // ← همان id آگهی برای همه تصاویر
        }));

        const newAd = {
            id: adId,
            seller: "ali", // یا از توکن کاربر بگیری
            ...adData,
            images: images,
           createdAt: new Date(),
            views: 0 
        };
        ads.unshift(newAd);
        
        // 🆕 ارسال آگهی جدید به همه کلاینت‌ها
        io.emit("newAd", newAd);
        res.json({ success: true, ad: newAd }); // ← پاسخ JSON شامل id واحد
    });

   app.post('/ads/:id/views', (req, res) => {
    const adId = parseInt(req.params.id);
    const ad = ads.find(a => a.id === adId);
    if (!ad) return res.status(404).json({ error: 'Ad not found' });

    ad.views = (ad.views || 0) + 1;  // افزایش تعداد بازدید
    res.json({ views: ad.views });
});


    // گرفتن آگهی خاص با id
    app.get('/ads/:id', (req, res) => {
        const adId = parseInt(req.params.id);
        const ad = ads.find(a => a.id === adId);
        if (!ad) {
            return res.status(404).json({ error: 'Ad not found' });
        }
            res.json(ad);
        });    

        app.get('/ads', (req, res) => {
        res.json({ ads });
    });

    const PORT = process.env.PORT || 3001;
    
    const server = http.createServer(app);

    const io = new Server(server, {
        cors: {
            origin: "*", // یا فقط فرانتت "https://joenda.netlify.app"
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("یک کاربر وصل شد:", socket.id);

        socket.on("disconnect", () => {
            console.log("یک کاربر قطع شد:", socket.id);
        });
    });

    server.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
    // app.listen(PORT, () => {
    //     console.log(`Server is running on port ${PORT}`);
    // });


    // app.listen(PORT, () => {
        // console.log(`Server is running on port ${PORT}`);
    // });




