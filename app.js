// console.log("hello");
// for (var i = 0; i < 100; i++){
//     console.log(i)
// }
// console.log("loop finished")


// import express from "express"
// var http=require('http');

// http.createserver(function (req, res) {

//     res.end("Hello World");
// }
// ).listen(4000);



// import express from 'express';
// const app = express();

// app.use((req, res, next) => {
//     console.log(req.url);
//     next();
// });
// let users = [
//     { userName: 'haider', rollNumber: '2643' },
//     { userName: 'ali', rollNumber: '2644' },
//     { userName: 'basit', rollNumber: 'BSE-20F-003' },
//     { userName: 'souhaib', rollNumber: 'BSE-20F-080' },
// ]

// app.post(`/${users[0].userName}`, (req, res, next) => {
//     console.log('inside signup ');
//     res.end(`${users[0].rollNumber}`);
//     next();
// });
// app.post(`/${users[1].userName}`, (req, res, next) => {
//     console.log('inside signup ');
//     res.end(`${users[1].rollNumber}`);
//     next();
// });
// app.post(`/${users[2].userName}`, (req, res, next) => {
//     console.log('inside signup ');
//     res.end(`${users[2].rollNumber}`);
//     next();
// });
// app.post(`/${users[3].userName}`, (req, res, next) => {
//     console.log('inside signup ');
//     res.end(`${users[3].rollNumber}`);
// });

// app.use((req, res) => {
//     console.log('inside second middleware 1');
//     res.end();
// })

// app.listen(4000, () => {
//     console.log('=================== server started on 3000 ===================');
// });







// import bodyParser from "body-parser";
// import express from "express"
// const app = express();

// app.use(bodyParser.json({ limit: '2mb' }));
// app.use(bodyParser.urlencoded({ extended: true }));


// app.use((req, res) => {
//     console.log(req.body, "''''''''''''")
//     res.end();

// })

// app.listen('5000', () => {
//     console.log("*************SERVER END*************")
// })













import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Student from './model/model.js';
import morgan from 'morgan';

const app = express();

mongoose.connect("mongodb+srv://AbdulBasit:saylani123@cluster0.mwtn6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
mongoose.connection.once('open', () => {
    console.log('=================== ISI Secrete Database Connected ===================');
});
mongoose.connection.on('error', () => {
    console.log('=================== Black Vigo is outside your home ===================');
});


app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: false }))

// app.use((req, res) => {
//     console.log(req.body, '***************');
//     res.end();
// });

app.use(morgan('tiny'));





// get all data
app.get('/get-student', async (req, res) => {
    console.log(req.url);
    let alldata = await Student.find();
    res.json(alldata);
})
// get all data





// get data by name in url
app.get('/get-student/:studentname', async (req, res) => {
    let { studentname } = req.params;
    console.log(studentname);
    let alldata = await Student.find({ studentName: studentname });
    res.json(alldata);
})
// get data by name in url



// get data by limit
app.get('/get-student-page/:pagenumber/:limit', async (req, res) => {
    let { pagenumber, limit } = req.params;
    console.log(pagenumber, limit);
    let skipcount = (pagenumber - 1) * limit
    let alldata = await Student.find().limit(Number(limit)).skip(skipcount);
    res.json(alldata);
})
// get data by limit



// get One data  by Name
app.get('/get-one-student/:studentname', async (req, res) => {
    let { studentname } = req.params;
    console.log(studentname);
    let alldata = await Student.findOne({ studentName: studentname });
    res.json(alldata);
})
// get One data  by Name



// Update data by id by  Name
app.post('/Update-Name/:id', async (req, res) => {
    let { id } = req.params;
    // console.log(req.body)
    // console.log(id)
    let Update = await Student.findOneAndUpdate({ _id: id }, { studentName: req.body.Stname })
    res.json(Update)

})
// Update data by id by  Name



// Delete data by id
app.post('/Delete-Coll/:id', async (req, res) => {
    let { id } = req.params;
    // console.log(req.body)
    // console.log(id)
    let Delete = await Student.findOneAndDelete({ _id: id })
    res.json(Delete)

})
// Delete data by id



// Add data In MONGODB
app.post('/add-student', async (req, res) => {
    console.log(req.body);
    let student = new Student({
        studentName: req.body.stName,
        email: req.body.emailAdress,
        rollNumber: req.body.roll,
        Date: req.body.Date,
    });
    let saveData = await student.save();
    res.json(saveData);
})
// Add data In MONGODB
app.listen('5000', () => {
    console.log('=================== server started on 5000 ===================');
});






// import { StatusBar } from 'expo-status-bar';
// import React, { useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import axios from 'axios';


// export default function App() {

//     useEffect(async () => {
//         // let { data } = await axios.get("http://localhost:5000/get-all-students");
//         // console.log(data);

//         let docId = "61b04a659949555901546bf1";
//         let { data } = await axios.post(`http://localhost:5000/update-student/${docId}`, { rollNumber: 10000 });
//         console.log(data);




//     }, [])

//     return (
//         <View style={styles.container}>
//             <Text>Open up App.js to start working on your app!</Text>
//             <StatusBar style="auto" />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });










