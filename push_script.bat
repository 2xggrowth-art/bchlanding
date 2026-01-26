@echo off
echo --- Git Remote --- > push_output.txt
git remote -v >> push_output.txt 2>&1
echo. >> push_output.txt

echo --- Git Add --- >> push_output.txt
git add . >> push_output.txt 2>&1
echo. >> push_output.txt

echo --- Git Commit --- >> push_output.txt
git commit -m "fix: update admin email and add verification scripts" >> push_output.txt 2>&1
echo. >> push_output.txt

echo --- Git Push --- >> push_output.txt
git push -u origin main >> push_output.txt 2>&1
echo. >> push_output.txt

echo --- Verify Admin User --- >> push_output.txt
node scripts/verify-admin-user.js >> push_output.txt 2>&1
echo. >> push_output.txt

echo DONE >> push_output.txt
