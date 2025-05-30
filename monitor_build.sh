#!/bin/bash

echo "Monitoring FFmpeg build progress..."
echo "Build started at: $(date)"

while ps aux | grep -q "[a]ndroid.sh"; do
    echo "Build still running... $(date)"
    echo "Current build line:"
    tail -1 build.log
    echo "---"
    sleep 30
done

echo "Build finished at: $(date)"
echo "Last 10 lines of build log:"
tail -10 build.log

if [ -d "prebuilt" ]; then
    echo ""
    echo "Prebuilt directory contents:"
    ls -la prebuilt/
fi 