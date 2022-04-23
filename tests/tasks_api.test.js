const Task = require('../models/task');
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const api = supertest(app);

const initialTasks = [
    {
        title: "Learn Algorithms and Data Structures",
        duration: "More than a month",
        difficulty: "hard",
        description: "ALGOS and DS are really important concepts in Computer Science and learning them will greatly expand our knowledge in programming",
        completed: false,
        id: "62628488f78d19db3091f9dd"
    },
    {
        title: "Learn idioms in english",
        duration: "4 week",
        difficulty: "medium",
        description: "idioms are really nice and actually when you can communicate using them in any language, it indicates that you have a great knowledge of that language",
        completed: false,
        id: "626287c275bee648b9e068de"
    }
];

// using this operation evrytime we run the tests database will be in the same state as before
beforeEach(async () => {
    await Task.deleteMany({});
    let taskObject = new Task(initialTasks[0]);
    await taskObject.save();
    taskObject = new Task(initialTasks[1]);
    await taskObject.save();
});

describe('getting tasks', () => {
    test('tasks are returned in json format', async () => {
        await api
            .get('/api/tasks')
            .expect(200)
            .expect('Content-Type', /json/);
    });

    test('all tasks are returned', async () => {
        const response = await api.get('/api/tasks');
        expect(response.body).toHaveLength(initialTasks.length);
    });

    test('single task can be returned', async () => {
        await api
            .get('/api/tasks/626287c275bee648b9e068de')
            .expect(200);
    });

    test('first task difficulty is hard', async () => {
        const response = await api.get('/api/tasks');
        expect(response.body[0].difficulty).toBe(initialTasks[0].difficulty);
    });

    test('when given invalid endpoint tasks are not returned', async () => {
        await api
            .get('/api/taskss')
            .expect(404);
    });
});

describe('adding tasks', () => {
    test('valid task can be added', async () => {
        const taskObj = {
            title: "Learn idioms in english",
            duration: "4 week",
            difficulty: "medium",
            description: "idioms are really nice and actually when you can communicate using them in any language, it indicates that you have a great knowledge of that language",
            completed: false
        };

        await api
            .post('/api/tasks')
            .send(taskObj)
            .expect(201);
    });

    test('invalid task cannot be added', async () => {
        const taskObj = {
            title: "Learn idioms in english",
            duration: "4 week",
            difficulty: "medium",
            description: "idioms are really nice and actually when you can communicate using them in any language, it indicates that you have a great knowledge of that language",
        };

        await api
            .post('/api/tasks')
            .send(taskObj)
            .expect(400)
    });
});

describe('updating tasks', () => {
    test('task can be updated', async () => {
        const taskEdit = {
            title: "Learn idioms in english",
            duration: "4 week",
            difficulty: "medium",
            description: "idioms are really nice and actually when you can communicate using them in any language, it indicates that you have a great knowledge of that language",
            completed: true
        };

        const tasks = await api.get('/api/tasks');
        const taskToUpdate = tasks.body[1];

        await api
            .put(`/api/tasks/${taskToUpdate.id}`, taskEdit)
            .expect(201);
    });

    test('task with invalid id cannot be updated', async () => {
        const taskEdit = {
            title: "Learn idioms in english",
            duration: "4 week",
            difficulty: "medium",
            description: "idioms are really nice and actually when you can communicate using them in any language, it indicates that you have a great knowledge of that language",
            completed: true
        };

        const tasks = await api.get('/api/tasks');
        let taskToUpdate = tasks.body[1];
        taskToUpdate.id = 'dasdasiudui87131';

        await api
            .put(`/api/tasks/${taskToUpdate.id}`, taskEdit)
            .expect(400);
    });
});

describe('deleting tasks', () => {
    test('task can be deleted', async () => {
        const tasks = await api.get('/api/tasks');
        const taskToDelete = tasks.body[0];

        await api
            .delete(`/api/tasks/${taskToDelete.id}`)
            .expect(204);
    });

    test('task with invalid id cannot be deleted', async () => {
        const tasks = await api.get('/api/tasks');
        let taskToDelete = tasks.body[0];
        taskToDelete.id = 'dasd831873hda';

        await api
            .delete(`/api/tasks/${taskToDelete.id}`)
            .expect(400);
    });
});

afterAll(() => {
    mongoose.connection.close();
});