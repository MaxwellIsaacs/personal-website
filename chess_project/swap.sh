#!/bin/bash

# A bash script to swap filenames of chess pieces
# from *_black.png to *_white.png and vice versa

# Loop through all the png files with 'black' or 'white' in their name
for file in *_black.png *_white.png; do
  # Check if the file exists
  if [ -e "$file" ]; then
    # Swap 'black' for 'white' and vice versa in the filename
    newname=$(echo "$file" | sed 's/black/temp/g; s/white/black/g; s/temp/white/g')
    # Rename the file
    mv "$file" "$newname"
  else
    echo "File $file does not exist."
  fi
done

