"""VERIFICATION-ONLY placeholders so the page renders when the Figma asset host is unreachable.
They are deliberately plain shapes (not imitations of the real artwork). Real exports overwrite them."""
import os
from PIL import Image, ImageDraw
d = os.path.join(os.path.dirname(__file__), "..", "public", "assets")
os.makedirs(d, exist_ok=True)

def once(name, make):
    p = os.path.join(d, name)
    if not os.path.exists(p):
        make(p)

def laptop(p):
    im = Image.new("RGBA", (1000, 780), (0, 0, 0, 0)); g = ImageDraw.Draw(im)
    g.rounded_rectangle((120, 90, 880, 620), 30, fill=(70, 74, 70, 255)); g.rounded_rectangle((60, 600, 940, 690), 20, fill=(55, 58, 55, 255)); im.save(p)
def portrait(p):
    Image.new("RGB", (592, 792), (8, 8, 8)).save(p)
def coffee(p):
    Image.new("RGB", (912, 912), (40, 30, 26)).save(p)
def illo(p):
    open(p, "w").write('<svg xmlns="http://www.w3.org/2000/svg" width="281" height="261" viewBox="0 0 281 261"><rect x="50" y="40" width="211" height="187" rx="30" fill="#2a2a28"/></svg>')

once("northstar-laptop.png", laptop); once("portrait.png", portrait)
once("contact-coffee.png", coffee); once("welcome-illustration.svg", illo)
open(os.path.join(d, ".placeholder"), "w").write("placeholders in use\n")
