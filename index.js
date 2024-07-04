const readline = require('readline');
const { exec } = require('child_process');

class Alarm {
  constructor(time, id) {
    this.time = time;
    this.id = id;
    this.isActive = true;
    this.snoozeCount = 0;
  }

  alert() {
    if (this.isActive) {
        console.log(`Alarm ${this.id} is ringing! Time: ${this.time}\nChoose a command:\n 5. Snooze Alarm\n 6. Dismiss Alarm`);
    //   exec('powershell -c (New-Object Media.SoundPlayer "C:\\Windows\\Media\\Alarm03.wav").PlaySync();');
      this.isActive = false;
      alarmClock.currentRingingAlarm = this.id;
    }
  }

  snooze() {
    if (this.snoozeCount < 3) {
      this.snoozeCount++;
      const snoozeTime = new Date();
      snoozeTime.setMinutes(snoozeTime.getMinutes() + 5);
      this.time = `${snoozeTime.getHours().toString().padStart(2, '0')}:${snoozeTime.getMinutes().toString().padStart(2, '0')}`;
      this.isActive = true;
      console.log(`Alarm ${this.id} snoozed for 5 minutes. New time: ${this.time}`);
    } else {
      console.log(`Alarm ${this.id} cannot be snoozed more than three times.`);
    }
  }

  dismiss() {
    this.isActive = false;
    console.log(`Alarm ${this.id} dismissed.`);
  }
}

class AlarmClock {
  constructor() {
    this.alarms = [];
    this.currentId = 1;
    this.currentRingingAlarm = null; 
  }

  displayCurrentTime() {
    const now = new Date();
    console.log(`Current Time: ${now.toTimeString().split(' ')[0]}`);
  }

  addAlarm(time) {
    const newAlarm = new Alarm(time, this.currentId++);
    this.alarms.push(newAlarm);
    console.log(`Alarm set for ${time}. Alarm ID: ${newAlarm.id}`);
  }

  checkAlarms() {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    this.alarms.forEach(alarm => {
      if (alarm.time === currentTime) {
        alarm.alert();
      }
    });
  }

  snoozeAlarm(id) {
    const alarm = this.alarms.find(alarm => alarm.id === id);
    if (alarm) {
      alarm.snooze();
    } else {
      console.log(`Alarm with ID ${id} not found.`);
    }
  }

  dismissAlarm(id) {
    const alarm = this.alarms.find(alarm => alarm.id === id);
    if (alarm) {
      alarm.dismiss();
    } else {
      console.log(`Alarm with ID ${id} not found.`);
    }
  }

  listAlarms() {
    if (this.alarms.length === 0) {
      console.log('No alarms set.');
      return;
    }

    console.log('Alarms:');
    this.alarms.forEach(alarm => {
      console.log(`ID: ${alarm.id}, Time: ${alarm.time}, Snooze Count: ${alarm.snoozeCount}`);
    });
  }

  promptUser() {
    let menu = `
Choose a command:
1. Display Current Time
2. Add Alarm
3. List Alarms
4. Exit
`;

    

    rl.question(menu, (answer) => {
      switch (answer.trim()) {
        case '1':
          this.displayCurrentTime();
          this.promptUser();
          break;
        case '2':
          rl.question('Enter time (HH:MM): ', (time) => {
            this.addAlarm(time.trim());
            this.promptUser();
          });
          break;
        case '3':
          this.listAlarms();
          this.promptUser();
          break;
        case '4':
          rl.close();
          break;
        case '5':
          if (this.currentRingingAlarm !== null) {
            this.snoozeAlarm(this.currentRingingAlarm);
            this.currentRingingAlarm = null;
            this.promptUser();
          } else {
            console.log('No alarm is currently ringing.');
            this.promptUser();
          }
          break;
        case '6':
          if (this.currentRingingAlarm !== null) {
            this.dismissAlarm(this.currentRingingAlarm);
            this.currentRingingAlarm = null;
            this.promptUser();
          } else {
            console.log('No alarm is currently ringing.');
            this.promptUser();
          }
          break;
        default:
          console.log('Invalid command');
          this.promptUser();
      }
    });
  }
}

const alarmClock = new AlarmClock();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

setInterval(() => {
  alarmClock.checkAlarms();
}, 60000); 

alarmClock.promptUser();
