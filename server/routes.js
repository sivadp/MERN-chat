const express = require('express');
const router = express.Router();
const User = require('./models/User');
const { fetchChatHistory } = require('./fetchChatHistory'); 


router.post('/signup', async (req, res) => {
  try {
    const { userName, password} = req.body;
    const newUser = new User({
      userName,
      password,
    });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

router.post('/login', async (req, res) => {
    const { userName, password } = req.body;
  
    try {
      // Check if the user exists in the database
      const user = await User.findOne({ userName, password });
  
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401).send('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Internal server error');
    }
  });

  router.get('/users', async(req,res)=>{

    try {
      // Retrieve only the userNames and _id fields from the collection
      const users = await User.find({}, { userName: 1, _id: 1 });
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Internal server error');
    }

  })

 // Assuming you have a route to fetch chat history
router.get('/chat-history/:loggedUserId/:userId', async (req, res) => {
  const { loggedUserId, userId } = req.params;

  try {
    // Fetch chat history based on user IDs
    let chatHistory = await fetchChatHistory(loggedUserId, userId);
    res.status(200).json(chatHistory);

  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
