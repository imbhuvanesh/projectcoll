const express = require('express');
const mongoose = require('mongoose');

// Instance
const app = express();
app.use(express.json());

// Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/projectzero', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected....!!!'))
    .catch(err => console.error('MongoDB connection error:', err));
//get all items
app.get('/project-zero', async(req, res) => {
    // Logic to get all items from the database
    res.send(projectzero);
});
// Creating schema
const projectSchema = new mongoose.Schema({
    name: String,
    description: String
});

// Creating model
const Project = mongoose.model('Project', projectSchema);

// Define a POST route to add projects
app.post('/project-zero', (req, res) => {
    const { name, description } = req.body;

    const newProject = new Project({ name, description });
    newProject.save()
        .then((savedProject) => {
            console.log('Project saved to database:', savedProject);
            res.status(201).json(savedProject);
        })
        .catch(err => {
            console.error('Error saving project:', err);
            res.status(500).json({ error: 'Failed to save project' });
        });
});

// Define a GET route to retrieve all projects
app.get('/project-zero', (req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => {
            console.error('Error retrieving projects:', err);
            res.status(500).json({ error: 'Failed to retrieve projects' });
        });
});

//update project
app.put('/project-zero/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const updatedProject = await Project.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(updatedProject);
    } catch (err) {
        console.error('Error updating project:', err);
        res.status(500).json({ error: 'Failed to update project...!!!' });
    }
});
//delete project
app.delete('/project-zero/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        console.error('Error deleting project:', err);
        res.status(500).json({ error: 'Failed to delete project' });
    }
 })
// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});