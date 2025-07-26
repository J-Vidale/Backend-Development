const Project = require('../models/Project');

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Project name is required' });
  }

  const project = await Project.create({
    name,
    description,
    user: req.user._id,
  });

  res.status(201).json(project);
};

// @desc    Get all projects for current user
// @route   GET /api/projects
// @access  Private
const getProjects = async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  res.json(projects);
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Private (owner only)
const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project || project.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Access denied' });
  }

  res.json(project);
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (owner only)
const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project || project.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Access denied' });
  }

  project.name = req.body.name || project.name;
  project.description = req.body.description || project.description;

  const updated = await project.save();
  res.json(updated);
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (owner only)
const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project || project.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Access denied' });
  }

  await project.remove();
  res.json({ message: 'Project removed' });
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
