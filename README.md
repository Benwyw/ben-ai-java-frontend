# ben-ai-java-frontend

[![Deploy Vue.js to Ubuntu](https://github.com/Benwyw/ben-ai-java-frontend/actions/workflows/npm.yml/badge.svg)](https://github.com/Benwyw/ben-ai-java-frontend/actions/workflows/npm.yml)

VueJs Frontend for [Ben-AI-Java](https://github.com/Benwyw/Ben-AI-Java).

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

The Whity gallery automatically loads all images from `src/assets/cat/gallery/`.

### To Add New Photos:
1. **Name the file** with prefix `Whity_` followed by a number:
   - `Whity_13.jpeg`, `Whity_14.png`, etc.
2. **Compress the image** using the commands above
3. **Place in folder**: `src/assets/cat/gallery/`
4. **Done!** Photos are automatically loaded and sorted by number

### Supported Formats
`.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`

### Example Workflow
```bash
# 1. Copy new photo to gallery
cp ~/Downloads/new_cat_photo.jpg src/assets/cat/gallery/Whity_13.jpg

# 2. Compress it
cd src/assets/cat/gallery
magick Whity_13.jpg -resize '1200x1200>' -quality 82 -sampling-factor 4:2:0 -strip Whity_13.jpeg
rm Whity_13.jpg

# 3. That's it! The gallery will automatically include it
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

