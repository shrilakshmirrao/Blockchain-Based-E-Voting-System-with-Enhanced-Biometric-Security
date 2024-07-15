#!/bin/sh

touch file
echo "">file

face_recognition ../authorization/known_people/ ../authorization/unknown_people/ >file

output=$(python ./votes/check.py)

echo "">out

echo $output >out


