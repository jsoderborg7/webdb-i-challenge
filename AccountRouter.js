const express = require('express');

const db = require('./data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) =>{
  db('accounts')
  .then(accounts =>{
    res.status(200).json(accounts)
  })
  .catch(err =>{
    res.status(500).json(err);
  })
});

router.post('/', (req, res) =>{
  const accountData = req.body;
  if (!accountData.name || !accountData.budget){
    res.status(400).json({message: "Please provide name and budget for account"})
  } else {
    db('accounts')
    .insert(accountData, 'id')
    .then(account =>{
      res.status(200).json(account)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
  }
});

router.get('/:id', (req, res) =>{
  db('accounts')
  .where({id: req.params.id})
  .then(account =>{
    if (account[0]){
      res.status(200).json(account) 
    } else {
      res.status(404).json({message: "The account with the specified ID does not exist"})
    }
    
  })
  .catch(err =>{
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) =>{
  db('accounts')
  .where({id: req.params.id})
  .update(req.body)
  .then(account =>{
    if (account) {
      res.status(200).json(account)
    } else {
      res.status(404).json({message: "The account with the specified ID does not exist"})
    } 
  })
  .catch(err =>{
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) =>{
  db('accounts')
  .where({id: req.params.id})
  .del()
  .then(account =>{
    if (account){
      res.status(200).json(account)
    } else {
      res.status(404).json({message: "The account with the specified ID does not exist."})
    } 
  })
  .catch(err =>{
    res.status(500).json(err)
  })
});

module.exports = router;