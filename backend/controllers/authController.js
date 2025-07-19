exports.signupUser = (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
  
    // You can add database logic here later
    console.log("User signup data:", { name, email, password });
  
    res.status(200).json({ message: "Signup successful!" });
  };
  