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

