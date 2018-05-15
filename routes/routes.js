
const express = require("express"),
      router = express.Router(),
      contactsController = require('../controllers/contactsController')

router.get('/contacts', contactsController.getContacts)             // get all contact

router.get('/contacts/:id', contactsController.getSpecificContact)   // get a specific contact

router.post('/contacts', contactsController.pushContact)            // add a new contact to db.

router.put('/contacts/:id', contactsController.updateContact)       // update any contact.

router.put('/contacts/softdelete/:id', contactsController.deleteContact) //softdeleteContact

router.get('/contacts/csv', contactsController.sendCSV)                //send csv

/*
app.post('/contacts',(req,res)=>{
  console.log(req)
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let file = req.files.picture;
  // add a random string generator here.
  var filename=file.name;
  // Use the mv() method to place the file somewhere on your server
  file.mv(path.join(__dirname, 'public/images',filename), function(err) {
    if (err){
      return res.status(500).send(err);
    }else{
      var query="INSERT INTO contacts (firstname,lastname,email,mobile,photo,gender) VALUES("+req.query.firstname+","+req.query.lastname+","+req.query.email+","+req.query.mobile+","+"'"+filename+"'"+","+req.query.gender+")";
      console.log(query)
      sqlDB.query(query, function (error, results, fields) {
    		if (error){
          throw error;
        }else{
    		    res.redirect('/api/contacts');
        }
  	   });
    }
  });
});
*/

/*app.put('/contacts/:id',(req,res)=>{
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let file = req.files.picture;
  // add a random string generator here.
  var filename=file.name;
  file.mv(path.join(__dirname, 'public/images',filename), function(err) {
    if (err){
      return res.status(500).send(err);
    }else{
      let query="UPDATE contacts SET firstname=?,lastname=?,email=?,mobile=?,photo=?,gender=) where id=?"
      let values=[req.query.firstname,req.query.lastname,req.query.email,req.query.mobile,filename,req.query.gender,req.params.id]
      sqlDB.query(query,values ,function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
    }
  });
});*/

module.exports = router;
