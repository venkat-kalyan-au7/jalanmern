

---

# Alarm Clock Command Line Application

## Running the Application

To run the `index.js` file in VS Code, use the following command:

```bash
node index.js
```

## Menu Options

When you run the application, you will be presented with the following menu options:

```
Choose a command:
1. Display Current Time
2. Add Alarm
3. List Alarms
4. Exit
```

## Example Interaction

Here’s an example of how to interact with the application:

1. **Add an Alarm**

   Select option `2` to add a new alarm.

   ```
   2
   ```

   You will be prompted to enter the alarm time in `HH:MM` format.

   ```
   Enter time (HH:MM): 14:30
   ```

   After entering the time, you will see a confirmation message:

   ```
   Alarm set for 14:30. Alarm ID: 1
   ```

2. **Main Menu Reappears**

   The main menu will appear again for further actions:

   ```
   Choose a command:
   1. Display Current Time
   2. Add Alarm
   3. List Alarms
   4. Exit
   ```

3. **Handling a Ringing Alarm**

   When the alarm rings, the menu will include options to snooze or dismiss the alarm:

   ```
   Alarm 1 is ringing! Time: 14:30
   Choose a command:
   5. Snooze Alarm
   6. Dismiss Alarm
   ```

   - **Snooze Alarm**: Enter `5` to snooze the alarm.

     ```
     5
     Alarm 1 snoozed for 5 minutes. New time: 14:35
     ```

   - **Dismiss Alarm**: Enter `6` to dismiss the alarm.

     ```
     6
     Alarm 1 dismissed.
     ```

## Summary of Menu Options

- **1. Display Current Time**: Shows the current time.
- **2. Add Alarm**: Prompts you to enter a time to set a new alarm.
- **3. List Alarms**: Lists all the set alarms with their details.
- **4. Exit**: Exits the application.

---
