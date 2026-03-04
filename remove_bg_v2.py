import sys
from PIL import Image

def process_image(img_path, target_path, tol=20):
    try:
        img = Image.open(img_path).convert("RGBA")
        datas = img.getdata()
        newData = []
        for item in datas:
            # Change all white (also shades of whites)
            # pixels to transparent
            if item[0] > 255 - tol and item[1] > 255 - tol and item[2] > 255 - tol:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
                
        img.putdata(newData)
        img.save(target_path, "PNG")
        print(f"Successfully processed {img_path} to {target_path}")
    except Exception as e:
        print(f"Error processing {img_path}: {e}")
        sys.exit(1)

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python remove_bg_v2.py <input> <output>")
        sys.exit(1)
    process_image(sys.argv[1], sys.argv[2])
