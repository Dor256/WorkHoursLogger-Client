# Work Logger App #

## The home page of the Web App: ##

![Image description](https://github.com/Dor256/WorkHoursLogger-Server/blob/master/src/main/resources/static/UI.png)

### Enter ###
Sends current time to the server to save entry time

Clicking **Enter** will make the button glow green, indicating the user is currently working.
Assuming there is no error from the server - the user will see a green banner indicating that the time
of entry has been logged to the server.

![Image description](https://github.com/Dor256/WorkHoursLogger-Server/blob/master/src/main/resources/static/UI_Entry.PNG)

### Exit ###
Updates with current time in server to save exit time

Clicking **Exit** will make the **Enter** button stop glowing green, indicating you have left the office, 
in addition to logging the time of leaving.

### Send Log ###
Sends the work log from the 26th of last month to the 25th of the current month


### Errors ###
Clicking **Send Log** whilst working (**Enter** button glowing green) will show a red banner indicating
an error as the user will not be able to send the monthly log without first Exiting.

![Image description](https://github.com/Dor256/WorkHoursLogger-Server/blob/master/src/main/resources/static/UI_Error.PNG)