# Question Answer Site

Question Answer Site where users can write,ask,comment,upvote ,delete questions and answers

## Installation Process

### Install Node.js and NPM
```
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm

```

### Install Mongo DB

#### Step1
```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
```
After successfully importing the key  output will be
```
gpg: Total number processed: 1
gpg:               imported: 1  (RSA: 1)
```
command to create a list file for MongoDB.

```
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list


sudo apt-get update
```
#### Step 2

```
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

#### Verify

```
sudo systemctl status mongod
```
 
Output should be

```
● mongodb.service - High-performance, schema-free document-oriented database
   Loaded: loaded (/etc/systemd/system/mongodb.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2016-04-25 14:57:20 EDT; 1min 30s ago
 Main PID: 4093 (mongod)
    Tasks: 16 (limit: 512)
   Memory: 47.1M
      CPU: 1.224s
   CGroup: /system.slice/mongodb.service
           └─4093 /usr/bin/mongod --quiet --config /etc/mongod.conf
``` 

### Run Server

Run the following command
```
node server.js
```





Then open [http://localhost:3000/](http://localhost:3000/) to see your app
