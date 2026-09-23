#!/bin/bash
# Variation 1: Regular isometric angles
convert -size 1024x1024 xc:black \
  -fill white \
  -draw "polygon 496,268 338,362 338,518 410,560 410,654 496,704 496,536 422,492 496,448" \
  -draw "polygon 528,268 686,362 686,518 614,560 614,654 528,704 528,536 602,492 528,448" \
  v1.png

# Variation 2: Tighter proportions
convert -size 1024x1024 xc:black \
  -fill white \
  -draw "polygon 496,276 346,364 346,514 416,556 416,648 496,698 496,536 424,492 496,448" \
  -draw "polygon 528,276 678,364 678,514 608,556 608,648 528,698 528,536 600,492 528,448" \
  v2.png

# Variation 3: Proportional to VibeCode.png
# Let's check slope: in VibeCode.png:
# Roof: from (495, 272) to (346, 362) -> dx = -149, dy = 90 (slope 0.604)
# Left vertical: (346, 362) to (346, 524) -> length 162
# Notch: (346, 524) to (418, 568) -> dx = +72, dy = 44 (slope 0.611)
# Lower vertical: (418, 568) to (418, 646) -> length 78
# Bottom tip: (418, 646) to (495, 706) -> dx = +77, dy = 60 (slope 0.779)
# Inner slit bottom: from (495, 706) up to (495, 542)
# Inner hex: (495, 542) to (426, 498) to (495, 454)
# Inner slit top: from (495, 454) up to (495, 272)
convert -size 1024x1024 xc:black \
  -fill white \
  -draw "polygon 496,272 346,362 346,524 418,568 418,646 496,706 496,542 426,498 496,454" \
  -draw "polygon 528,272 678,362 678,524 606,568 606,646 528,706 528,542 598,498 528,454" \
  v3.png

ls -lh v1.png v2.png v3.png
