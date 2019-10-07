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
  db('accounts')
  .insert(accountData, 'id')
  .then(account =>{
    res.status(200).json(account)
  })
  .catch(err =>{
    res.status(500).json(err)
  })
});

router.get('/:id', (req, res) =>{
  db('accounts')
  .where({id: req.params.id})
  .then(account =>{
    res.status(200).json(account)
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
    res.status(200).json(account)
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
    res.status(200).json(account)
  })
  .catch(err =>{
    res.status(500).json(err)
  })
});

module.exports = router;