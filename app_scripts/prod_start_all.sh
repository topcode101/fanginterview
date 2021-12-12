#!/bin/bash

# Start the first process
./prod_start_server.sh &
  
# Start the second process
./prod_start_client.sh &
  
# Wait for any process to exit
wait -n
  
# Exit with status of process that exited first
exit $?