# Ícones da Extensão PingColor

Para criar os ícones PNG necessários, converta o arquivo SVG em `src/assets/icon.svg` para os seguintes tamanhos:

- `icon16.png` (16x16 pixels)
- `icon32.png` (32x32 pixels)  
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

## Como converter SVG para PNG:

### Opção 1: Online
1. Acesse https://cloudconvert.com/svg-to-png
2. Faça upload do arquivo `src/assets/icon.svg`
3. Defina as dimensões desejadas (16x16, 32x32, 48x48, 128x128)
4. Baixe os arquivos PNG gerados

### Opção 2: Inkscape (Desktop)
```bash
# Instalar Inkscape
# Windows: https://inkscape.org/release/
# macOS: brew install --cask inkscape
# Linux: sudo apt install inkscape

# Converter para diferentes tamanhos
inkscape --export-type=png --export-width=16 --export-filename=icon16.png src/assets/icon.svg
inkscape --export-type=png --export-width=32 --export-filename=icon32.png src/assets/icon.svg
inkscape --export-type=png --export-width=48 --export-filename=icon48.png src/assets/icon.svg
inkscape --export-type=png --export-width=128 --export-filename=icon128.png src/assets/icon.svg
```

### Opção 3: ImageMagick
```bash
# Instalar ImageMagick
convert src/assets/icon.svg -resize 16x16 icons/icon16.png
convert src/assets/icon.svg -resize 32x32 icons/icon32.png
convert src/assets/icon.svg -resize 48x48 icons/icon48.png
convert src/assets/icon.svg -resize 128x128 icons/icon128.png
```

**Importante:** Substitua este arquivo README.md pelos arquivos PNG reais antes de publicar a extensão.