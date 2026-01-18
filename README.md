# ben-ai-java-frontend

[![Deploy Vue.js to Ubuntu](https://github.com/Benwyw/ben-ai-java-frontend/actions/workflows/npm.yml/badge.svg)](https://github.com/Benwyw/ben-ai-java-frontend/actions/workflows/npm.yml)

VueJs Frontend for [Ben-AI-Java](https://github.com/Benwyw/Ben-AI-Java).

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run serve

# Production build
npm run build:prod

# Production build with pre-compressed gzip files
npm run build:prod:gzip
```

---

## 📦 Deployment Guide

### Prerequisites

- Node.js 18+
- nginx (on server)

### Build for Production

```bash
# Standard production build
npm run build:prod

# With pre-compressed files (recommended for low-resource servers)
npm run build:prod:gzip
```

The build output will be in the `dist/` folder.

### Server Configuration (nginx)

For optimal performance on low-resource servers (e.g., 0.5 CPU, limited RAM), use the provided nginx configuration:

1. **Copy the optimization config to your server:**
   ```bash
   scp docs/nginx-optimization.conf user@server:/etc/nginx/snippets/
   ```

2. **Include it in your nginx server block:**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/ben-ai-java-frontend/dist;
       
       # Include optimizations
       include snippets/nginx-optimization.conf;
   }
   ```

3. **Test and reload nginx:**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Deployment Checklist

- [ ] Run `npm run build:prod:gzip` to create optimized build
- [ ] Upload `dist/` folder to server
- [ ] Configure nginx with `docs/nginx-optimization.conf`
- [ ] Verify gzip_static is working: `curl -H "Accept-Encoding: gzip" -I https://your-domain.com/assets/index-xxx.js`

### Performance Optimizations Included

| Optimization | Benefit |
|-------------|---------|
| WebP images | 60-80% smaller than JPEG/PNG |
| Lazy-loaded gallery | Initial page load ~300KB instead of ~3MB |
| Pre-compressed .gz files | Reduces server CPU usage |
| Long cache headers | Reduces repeated requests |
| Code splitting | Only load what's needed |
| Terser minification | Smaller JS bundles |

---

## 🖼️ Image Optimization Guide

### Prerequisites
Install ImageMagick (macOS):
```bash
brew install imagemagick
```

### Compress Single Image
```bash
# For JPEG/JPG (recommended for photos)
magick INPUT.jpg -resize '1200x1200>' -quality 82 -sampling-factor 4:2:0 -strip OUTPUT.jpeg

# For PNG (keeps transparency)
magick INPUT.png -resize '1200x1200>' -quality 85 OUTPUT.png
```

### Compress All Images in a Folder
```bash
cd src/assets/cat/gallery

# Backup originals first
mkdir -p backup
cp *.{jpg,jpeg,JPG,JPEG,png,PNG} backup/ 2>/dev/null

# Compress all JPEG/JPG files
for file in *.{jpg,jpeg,JPG,JPEG}; do
  [ -f "$file" ] || continue
  magick "$file" -resize '1200x1200>' -quality 82 -sampling-factor 4:2:0 -strip "${file%.*}_compressed.jpeg"
  mv "${file%.*}_compressed.jpeg" "${file%.*}.jpeg"
  [ "$file" != "${file%.*}.jpeg" ] && rm "$file"
  echo "Compressed: $file"
done
```

### Parameters Explained
| Parameter | Description |
|-----------|-------------|
| `-resize '1200x1200>'` | Max dimension 1200px, only shrink (never enlarge) |
| `-quality 82` | JPEG quality (80-85 is good balance for photos) |
| `-sampling-factor 4:2:0` | Chroma subsampling for smaller file size |
| `-strip` | Remove metadata (EXIF, GPS, etc.) |

### Recommended File Sizes
| Use Case | Target Size |
|----------|-------------|
| Hero image | 200-400 KB |
| Gallery thumbnail | 100-200 KB |
| Full-size photo | 200-500 KB |

---

## 🐱 Whity Gallery - Adding New Photos

The Whity gallery uses optimized WebP images with lazy loading for fast performance.

### Quick Add (Recommended)

```bash
# 1. Add your photo to the gallery folder
cp ~/Downloads/new_cat_photo.jpg src/assets/cat/gallery/Whity_13.jpeg

# 2. Run the optimization script (creates WebP + thumbnails)
npm run optimize:images

# 3. Build and deploy
npm run build:prod:gzip
```

The `optimize:images` script automatically:
- Creates WebP thumbnails (300px) for the gallery grid
- Creates full-size WebP (1200px) for the lightbox
- Achieves ~70% file size reduction

### File Naming Convention

Name files with prefix `Whity_` followed by a number:
- `Whity_1.jpg`, `Whity_2.jpeg`, `Whity_13.png`, etc.
- Photos are automatically sorted by number

### Supported Input Formats
`.jpg`, `.jpeg`, `.png`

### Output Structure
```
src/assets/cat/gallery/
├── Whity_1.jpg              # Original (kept for reference)
├── thumbnails/
│   └── Whity_1_thumb.webp   # 300px thumbnail (~6-10KB)
└── webp/
    └── Whity_1.webp         # Full-size WebP (~50-150KB)
```

---

## 🎬 Video Optimization Guide

### Prerequisites
Install FFmpeg (macOS):
```bash
brew install ffmpeg
```

### Compress Video for Web (Hero Background)
```bash
# Optimized for web: 720p, no audio, 10 seconds, fast start
ffmpeg -i INPUT.MOV -vcodec libx264 -crf 28 -preset fast -vf "scale=720:-2" -an -movflags +faststart -t 10 OUTPUT.mp4
```

### Parameters Explained
| Parameter | Description |
|-----------|-------------|
| `-vcodec libx264` | H.264 codec (best browser support) |
| `-crf 28` | Quality (18-28 is good, higher = smaller file) |
| `-preset fast` | Encoding speed (fast/medium/slow) |
| `-vf "scale=720:-2"` | Scale to 720p width, auto height |
| `-an` | Remove audio (for background videos) |
| `-movflags +faststart` | Enable streaming before full download |
| `-t 10` | Limit to 10 seconds |

### Alternative Presets
```bash
# Higher quality (larger file ~500KB-1MB)
ffmpeg -i INPUT.MOV -vcodec libx264 -crf 23 -preset medium -vf "scale=1080:-2" -an -movflags +faststart -t 15 OUTPUT.mp4

# Smaller file (lower quality ~100-200KB)
ffmpeg -i INPUT.MOV -vcodec libx264 -crf 32 -preset fast -vf "scale=480:-2" -an -movflags +faststart -t 10 OUTPUT.mp4

# Keep audio (for videos that need sound)
ffmpeg -i INPUT.MOV -vcodec libx264 -crf 28 -preset fast -vf "scale=720:-2" -acodec aac -b:a 128k -movflags +faststart OUTPUT.mp4
```

### Recommended Video Sizes
| Use Case | Target Size | Settings |
|----------|-------------|----------|
| Hero background | 200-500 KB | 720p, CRF 28, 10s max |
| Feature video | 1-3 MB | 1080p, CRF 23, 30s max |
| Full video | 5-10 MB | 1080p, CRF 20, with audio |

---

## 📜 NPM Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run serve` | Start development server on port 3000 |
| `npm run build:dev` | Build for development |
| `npm run build:prod` | Build for production (minified) |
| `npm run build:prod:gzip` | Build + create pre-compressed .gz files |
| `npm run optimize:images` | Convert gallery images to optimized WebP |
| `npm run lint` | Run ESLint with auto-fix |
| `npm run preview` | Preview production build locally |

---

## 📁 Project Structure

```
src/
├── assets/
│   └── cat/
│       ├── gallery/           # Original gallery photos
│       │   ├── thumbnails/    # WebP thumbnails (auto-generated)
│       │   └── webp/          # Full-size WebP (auto-generated)
│       ├── Whity_hero.webp    # Optimized hero image
│       └── Whity_hero_video.mp4
├── components/
│   └── cat/
│       ├── GallerySection.vue # Lazy-loading gallery
│       ├── HeroSection.vue    # Video hero with fallback
│       └── MemoriesSection.vue
└── views/
    └── cat/
        └── CatLanding.vue
```

