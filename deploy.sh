#!/bin/shssh 

git add .
git commit -m "run test from server"
git push origin test

ssh -i ~/Downloads/yourkey.pem boysonyb@34.87.25.4 -T <<EOF
  sudo su
  cd /root/messenger-webhook
  
  echo "git fetch"
  git fetch

  echo "pull test from origin"
  git pull origin test
  
  echo "run typescript compiler"
  tsc
  
  exit
EOF