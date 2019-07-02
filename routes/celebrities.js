const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity')

router.post('/', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
      console.log('Success')
      res.redirect('/celebrities')
    })
    .catch(err => {
      console.log(err);
      res.render('new')
    })
})

router.post('/:id', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.findByIdAndUpdate(req.params.id, {
    name,
    occupation,
    catchPhrase
  })
    .then(() => {
      res.redirect('/celebrities')
    })
    .catch(err => {
      console.log(err)
    })

})

router.post('/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/celebrities')
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/', (req, res) => {
  console.log('working')
  Celebrity.find()
    .then(celebrity => {
      // res.send({ celebrity })
      res.render('celebrities', { celebrity })
    })
    .catch(err => {
      console.log('Error occured when rendering celebrities: ' + err)
    })
})

router.get('/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      res.render('edit', { celebrity })
    })
    .catch(err => {
      console.log(err)
    })
})
router.get('/:id', (req, res, next) => {
  const id = req.params.id
  Celebrity.findById(id)
    .then(celebrity => {
      res.render('show', { celebrity })
    })
    .catch(err => {
      console.log('Error calling celebrity info: ' + err);
      next();
    })
})


router.get('/new', (req, res, next) => {
  console.log('working3')
  res.render('new')
})

module.exports = router;