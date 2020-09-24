zip -r app.zip app
scp app.zip root@178.128.187.156:/workspace/fanginterview/.
echo Please \'ssh root@178.128.187.156\'. and run \'prod-redeploy.sh\'.

ssh root@178.128.187.156