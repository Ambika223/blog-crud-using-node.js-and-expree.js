const cl = console.log;

const blogs = [
    {
        "id": "1",
        "title": "My First Blog",
        "description": "This is my first blog post.",
        "author": "John",
        "isPublished": true
    },
    {
        "id": "2",
        "title": "A Trip to Manali",
        "description": "My experience visiting Manali with friends.",
        "author": "Rahul",
        "isPublished": true
    },
    {
        "id": "3",
        "title": "Healthy Morning Routine",
        "description": "Simple habits to start your day.",
        "author": "Priya",
        "isPublished": false
    },
    {
        "id": "4",
        "title": "Best Places to Visit",
        "description": "Explore beautiful tourist destinations.",
        "author": "Amit",
        "isPublished": true
    },
    {
        "id": "5",
        "title": "My Fitness Journey",
        "description": "How I started exercising regularly.",
        "author": "Sneha",
        "isPublished": false
    },
    {
        "id": "6",
        "title": "Learning Photography",
        "description": "Basic photography tips for beginners.",
        "author": "Rohan",
        "isPublished": true
    },
    {
        "id": "7",
        "title": "Cooking at Home",
        "description": "Easy and delicious homemade recipes.",
        "author": "Neha",
        "isPublished": true
    },
    {
        "id": "8",
        "title": "Time Management Tips",
        "description": "How to manage time effectively.",
        "author": "Karan",
        "isPublished": false
    }
]


const port = 3000;

const express = require('express');
const app = express();
app.use(express.json());


//read 
app.get('/api/blogs', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            messsage: `Blogs fetched successfully`,
            data: blogs
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while fetching blog`,
            error: err.message
        })
    }
})


//GET SINGLE
app.get('/api/blogs/:id', (req, res) => {
    try {
        let blogId = req.params.id;
        let obj = blogs.find(blogs => blogs.id === blogId);
        if (!obj) {
            return res.status(404).json({
                success: false,
                message: `blogs not found`
            })
        }
        res.status(200).json({
            success: true,
            message: `Blogs fetched successfully`,
            data: obj
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while fetching single blog`,
            error: err.message
        })
    }
})


//CREATE
app.post(`/api/blogs`, (req, res) => {
    try {
        let body = req.body;
        if (!body.title || !body.description) {
            return res.status(400).json({
                success: false,
                message: `title or description is not found`

            })
        }
        let blog_obj = {
            title: body.title,
            description: body.description,
            author: body.author || "anonymous",
            isPublished: body.isPublished ? true : false,
            id: Date.now().toString()
        }
        blogs.unshift(blog_obj)
        res.status(201).json({
            success: true,
            data: blog_obj,
            message: `The blog created Successfully `
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while creating blog`,
            error: err.message
        })

    }
})


//UPDATE
app.patch('/api/blogs/:id', (req, res) => {
    try {
        let update_id = req.params.id;
        let getIndex = blogs.findIndex(blog => blog.id === update_id);
        if (getIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `The blog with id ${update_id} is not found`
            })
        }

        let updated_blog = {
            ...blogs[getIndex],
            ...req.body,
            id: update_id
        }
        blogs[getIndex] = updated_blog;

        res.status(200).json({
            success: true,
            data: updated_blog,
            message: `The blog with id ${update_id} updated successfully`
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while updating blog`,
            error: err.message
        })
    }
})

//DELETE
app.delete('/api/blogs/:id', (req, res) => {
    try {
        let remove_id = req.params.id;
        let getIndex = blogs.findIndex(b => b.id === remove_id);
        if (getIndex == -1) {
            return res.status(404).json({
                success: false,
                msg: `The blog with id ${remove_id} is not found`
            })
        }
        let remove_blog = blogs.splice(getIndex, 1);
        res.status(200).json({
            success: true,
            msg: `Blog with ${remove_id} is removed successfully`,
            data: remove_blog[0]
        })

    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while removing blog`,
            error: err.message
        })

    }
})

app.listen(3000, () => {
    cl(`server running on port ${port}`);
})