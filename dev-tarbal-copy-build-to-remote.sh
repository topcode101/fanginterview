zip -r app.zip app
scp app.zip root@178.128.187.156:/workspace/fanginterview/.
echo Wait to login... \'ssh root@178.128.187.156\'. 
echo Please run \'prod-redeploy.sh\' to re-deploy server (both server and client side).

ssh -t root@178.128.187.156  'cd /workspace/fanginterview; exec "$SHELL"'

#ssh root@178.128.187.156