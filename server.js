const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();

const PORT = 3000;

/* Middleware */

app.use(cors());
app.use(express.json());

/* Serve Frontend Files */

app.use(express.static(__dirname));

/* Database File */

const DATA_FILE = path.join(__dirname, 'tasks.json');

/* GET ALL TASKS */

app.get('/tasks', (req, res) => {

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {

        if (err) {
            return res.status(500).json({
                error: 'Unable to read tasks'
            });
        }

        res.json(JSON.parse(data));
    });
});

/* SAVE TASK */

app.post('/tasks', (req, res) => {

    const newTask = req.body.task;

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {

        if (err) {
            return res.status(500).json({
                error: 'Unable to read database'
            });
        }

        const tasks = JSON.parse(data);

        tasks.push(newTask);

        fs.writeFile(
            DATA_FILE,
            JSON.stringify(tasks, null, 2),
            (err) => {

                if (err) {
                    return res.status(500).json({
                        error: 'Unable to save task'
                    });
                }

                res.json({
                    message: 'Task Saved Successfully'
                });
            }
        );
    });
});

/* DELETE TASK */

app.delete('/tasks/:index', (req, res) => {

    const index = req.params.index;

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {

        if (err) {
            return res.status(500).json({
                error: 'Unable to read database'
            });
        }

        const tasks = JSON.parse(data);

        tasks.splice(index, 1);

        fs.writeFile(
            DATA_FILE,
            JSON.stringify(tasks, null, 2),
            (err) => {

                if (err) {
                    return res.status(500).json({
                        error: 'Unable to delete task'
                    });
                }

                res.json({
                    message: 'Task Deleted'
                });
            }
        );
    });
});

/* START SERVER */

app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);
});