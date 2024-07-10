const express = require("express")
const operations = require('./mongo')
const app = express()

app.use(express.json())

app.post('/create', async (req,res) => {
    try {
        const { name, email, hobbies } = req.body; 
        await operations.create({name, email, hobbies}); 
    
        res.status(201).json({ message: 'Document created successfully' });
      } catch (err) {
        console.error('Error creating document:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
app.put('/update/:email', async (req,res) => {
    try{
        const { name, hobbies } = req.body
        const new_email = req.params.email;

        await operations.updateOne(
            {name: req.body.name},
            {$set:{email: new_email}}
        )
        res.json({ message: 'Operation updated successfully'});
    }
    catch (err) {
        console.error('Error updating operation:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})    
app.get('/user-email', async (req,res) => {
    const name = req.body.name
    const check = await operations.findOne({name})
    if(check){
        res.send(check.email)
    } else{
        res.send("error")
    }
})

app.delete('/delete/:name', async (req,res) => {
    try{
        const name = req.params.name
        await operations.deleteOne({name})
        res.json({ message: 'Operation deleted successfully'});
    } catch{
        res.send("error")
    }
    
})

app.listen(3000,() => {
    console.log("Server is listening...");
})