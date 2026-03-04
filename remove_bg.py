import io
import sys
from PIL import Image

def remove_color(img_path, target_color, tol=30):
    img = Image.open(img_path).convert("RGBA")
    data = img.getdata()
    new_data = []
    
    tr, tg, tb = target_color
    
    for item in data:
        r, g, b, a = item
        # Calculate roughly how close it is to target color (Manhattan distance)
        # Using simple distance since the backgrounds from AI are usually flat/solid
        if abs(r - tr) < tol and abs(g - tg) < tol and abs(b - tb) < tol:
            new_data.append((255, 255, 255, 0)) # transparent
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(img_path, "PNG")

if __name__ == "__main__":
    remove_color(sys.argv[1], (0, 255, 0), int(sys.argv[2]))
